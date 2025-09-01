<?php

namespace App\Controller;

use App\Entity\company;
use App\Service\tenantManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class companyController extends abstractController
{
    #[Route('/register-company', name: 'register_company')]
    public function register(Request $request, EntityManagerInterface $em, tenantManager $tenantManager): Response
    {
        $name = $request->get('name');
        $dbName = 'kube_' . strtolower($name);

        $company = new Company();
        $company->setName($name);
        $company->setDatabaseName($dbName);
        $em->persist($company);
        $em->flush();

        $tenantManager->createTenantDatabase($dbName);

        return new Response("Company $name registered with DB $dbName");
    }
}