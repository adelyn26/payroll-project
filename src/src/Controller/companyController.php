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
        //to save the company database name
        $name = $data['name'];
        $dbName = 'kube_' . strtolower($name);
        try {
            $company = new Company();
            $company->setName($name);
            $company->setDatabaseName($dbName);
            $company->setEmployee($data['employee']);
            $company->setAmountEmployee($data['amountEmployees']);
            $company->setAddress($data['address']);
            $company->setEmail($data['email']);
            $company->setPhoneNumber($data['phoneNumber']);
            $company->setRnc($data['rnc']);
            $company->setSector($data['sector']);
            $company->setUser($data['user']);

            $em->persist($company);
            $em->flush();

            $tenantManager->createTenantDatabase($dbName);
        }catch (\Exception $exception){
            return new JsonResponse(['error' => $exception->getMessage()], 500);
        }

        $response = new JsonResponse(['message' => 'Company saved successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $response;
    }
}