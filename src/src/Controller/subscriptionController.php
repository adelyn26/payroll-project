<?php

namespace App\Controller;

use App\Entity\subscriptions;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class subscriptionController extends AbstractController
{
    #[Route('/create-subscription', name: 'create_subscription')]
    public function register(Request $request, EntityManagerInterface $entityManager): Response
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
        try {
            $subscription = new subscriptions();
            $subscription->setCompany($data['company']);
            $subscription->setPlan($data['plan']);
            $subscription->setBankReference($data['bank_reference']);
            $subscription->setEndDate(new \DateTime($data['end_date']));
            $subscription->setType(($data['type']));
            $subscription->setPaymentToken($data['payment_token']);
            $subscription->setStartDate($data['subscription_start_date']);
            $subscription->setStatus($data['status']);

            $entityManager->persist($subscription);
            $entityManager->flush();

        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
        $response = new JsonResponse(['message' => 'Subscription saved successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $response;
    }
}