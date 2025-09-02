<?php

namespace App\Controller;

use App\Entity\company;
use App\Entity\employee;
use App\Entity\user;
use App\Service\tenantManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class companyController extends abstractController
{
    #[Route('/register-company', name: 'register_company')]
    public function register(Request $request, EntityManagerInterface $em, tenantManager $tenantManager): Response
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

        $name = $request->get($data['name']);
        $employee = $request->get($data['employee']);
        $amountEmployees = $request->get($data['amountEmployees']);
        $address = $request->get($data['address']);
        $email = $request->get($data['email']);
        $dbName = 'kube_' . strtolower($name);
        $phoneNumber = $request->get($data['phoneNumber']);
        $rnc = $request->get('rnc');
        $sector = $request->get('sector');
        $user = $request->get('user');

        try {
            $company = new Company();
            $company->setName($name);
            $company->setDatabaseName($dbName);
            $company->setEmployee($employee);
            $company->setAmountEmployee($amountEmployees);
            $company->setAddress($address);
            $company->setEmail($email);
            $company->setPhoneNumber($phoneNumber);
            $company->setRnc($rnc);
            $company->setSector($sector);
            $company->setUser($user);

            $em->persist($company);
            $em->flush();

            $tenantManager->createTenantDatabase($dbName);
        }catch (\Exception $exception){

        }

        $response = new JsonResponse(['message' => 'Company saved successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $response;
    }
}