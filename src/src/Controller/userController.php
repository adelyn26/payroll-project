<?php

namespace App\Controller;

use App\Entity\company;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class userController extends AbstractController
{
    #[Route('/api/create-user', name: 'create_user', methods: ['POST', 'OPTIONS'])]
    public function userCreate(Request $request, EntityManagerInterface $entityManager, LoggerInterface $logger): JsonResponse
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }

        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return new JsonResponse(['message' => 'Invalid JSON data'], 400);
        }
        $company = $entityManager->getRepository(company::class)->find($data['company_id']);
        if (!$company) {
            return new JsonResponse(['error' => 'company not found'], 404);
        }


        try {
            $user = new user();
            $user->setName($data['name']);
            $user->setEmail($data['email']);
            $user->setPassword($data['password']);
            $user->setRole($data['role']);
            $user->setPhoneNumber($data['phoneNumber']);
            $user->setCompany($company);

            $entityManager->persist($user);
            $entityManager->flush();

        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
        $response = new JsonResponse(['message' => 'Employee saved successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $response;
    }

    #[Route('/api/user-update/{id}', name: 'update_user', methods: ['PUT'])]
    public function userUpdate(Request $request, EntityManagerInterface $entityManager, $id, LoggerInterface $logger): JsonResponse
    {
        $user = $entityManager->getRepository(user::class)->find($id);

        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data[0]) && is_array($data[0])) {
            $data = $data[0];
        }
        $user->setName($data['name']);
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $user->setRole($data['role']);
        $user->setPhoneNumber($data['phoneNumber']);

        if (!$data){
            return new JsonResponse(['message' => 'Invalid JSON data'], 400);
        }
        $entityManager->persist($user);
        $entityManager->flush();

        $this->addFlash('success', 'user updated');

        $response = new JsonResponse(['message' => 'employee updated successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $this->json([
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'password' => $user->getPassword(),
            'hiringDate' => $user->getPhoneNumber(),
            'role' => $user->getRole(),
            'message' => 'Employee updated successfully',
        ]);
    }
    #[Route('/api/delete-user/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function userDelete(Request $request, EntityManagerInterface $entityManager, $id): JsonResponse
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        $user = $entityManager->getRepository(user::class)->find($id);

        if (!$user) {
            $response = new JsonResponse(['message' => 'Employee not found'], Response::HTTP_NOT_FOUND);
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Employee deleted successfully'], Response::HTTP_OK);
    }
    #[Route('/api/send-code/{id}', name: 'send_verification_code')]
    public function sendCode(user $user, MailerInterface $mailer, EntityManagerInterface $em)
    {
        $verificationCode = substr(bin2hex(random_bytes(3)), 0, 6);
        $user->setVerificationCode($verificationCode);
        $user->setVerificationCodeExpiresAt((new \DateTime())->modify('+15 minutes'));
        $user->setIsVerified(false);

        $em->flush();

        $email = (new Email())
            ->from('adelynmorillorobles@gmail.com')
            ->to($user->getEmail())
            ->subject('Código de verificación')
            ->text("Tu código de verificación es: $verificationCode");

        $mailer->send($email);

        return $this->json(['message' => 'Código enviado']);
    }

    #[Route('/api/verify-code/{id}', name: 'api_verify_code')]
    public function verifyCode(user $user, string $code, EntityManagerInterface $entityManager): bool
    {
        $now = new \DateTime();

        if ($user->getVerificationCode() === $code &&
            $user->getVerificationCodeExpiresAt() > $now
        ) {
            $user->setIsVerified(true);
            $user->setVerificationCode(null);
            $user->setVerificationCodeExpiresAt(null);

            $entityManager->flush();

            return true;
        }

        return false;
    }

}