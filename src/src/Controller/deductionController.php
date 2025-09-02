<?php

namespace App\Controller;

use App\Repository\deductionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class deductionController extends AbstractController
{
    #[Route('/api/deduction', name: 'fetch_deduction', methods: ['GET', 'OPTIONS'])]
    public function fetchDeduction(Request $request, deductionRepository $deductionRepository): JsonResponse
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        $deductions = $deductionRepository->findAll();
        $data = array_map(fn ($deductions) => [
            'id' => $deductions->getId(),
            'type' => $deductions->getType(),
            'amount' => $deductions->getAmount(),
        ], $deductions);

        $response = new JsonResponse(['message' => 'fetch deduction successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $this->json($data);
    }

}
