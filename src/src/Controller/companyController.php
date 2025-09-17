<?php

namespace App\Controller;

use App\Service\CompanyMainService;
use App\Service\CompanyTenantService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class companyController extends AbstractController
{
    #[Route('/register-company', name: 'register_company')]
    public function register(
        Request $request,
        CompanyMainService $mainService,
        CompanyTenantService $tenantService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return new JsonResponse(['message' => 'Invalid JSON data'], 400);
        }

        try {
            $mainCompany = $mainService->registerCompany($data);

            $tenantService->setupTenant($mainCompany, $data);

            return new JsonResponse(['message' => 'Company saved successfully'], 201);
        } catch (\Exception $exception) {
            return new JsonResponse(['error' => $exception->getMessage()], 500);
        }
    }
}
