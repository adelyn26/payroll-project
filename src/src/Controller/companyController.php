<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\Employee;
use App\Entity\Plan;
use App\Entity\User;
use App\Entity\Subscription;
use App\Service\TenantDatabaseManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class companyController extends AbstractController
{
    #[Route('/register-company', name: 'register_company')]
    public function register(
        Request $request,
        EntityManagerInterface $em, // DB principal
        TenantDatabaseManager $tenantDbManager
    ): JsonResponse {

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

        $existingCompany = $em->getRepository(Company::class)->findOneBy(['rnc' => $data['rnc']]);
        if ($existingCompany) {
            return new JsonResponse(['message' => 'La empresa ya está registrada.'], 400);
        }

        $name = $data['name'];
        $dbName = 'kube_' . strtolower($name);

        try {
            // Crear empresa en DB principal
            $company = new Company();
            $company->setName($name);
            $company->setDatabaseName($dbName);
            $company->setAmountEmployee($data['amountEmployees']);
            $company->setAddress($data['address']);
            $company->setEmail($data['email']);
            $company->setPhoneNumber($data['phoneNumber']);
            $company->setRnc($data['rnc']);
            $company->setSector($data['sector']);

            $em->persist($company);
            $em->flush();

            // Crear DB tenant + migraciones
            $tenantDbManager->createAndMigrateTenant($dbName);
            $tenantEm = $tenantDbManager->getTenantEntityManager($dbName);

            // Crear empresa en DB tenant
            $tenantCompany = new Company();
            $tenantCompany->setName($name);
            $tenantCompany->setDatabaseName($dbName);
            $tenantCompany->setAmountEmployee($data['amountEmployees']);
            $tenantCompany->setAddress($data['address']);
            $tenantCompany->setEmail($data['email']);
            $tenantCompany->setPhoneNumber($data['phoneNumber']);
            $tenantCompany->setRnc($data['rnc']);
            $tenantCompany->setSector($data['sector']);
            $tenantEm->persist($tenantCompany);
            $tenantEm->flush();

            foreach ($data['employee'] as $index => $empData) {
                $employee = new Employee();
                $employee->setCompany($tenantCompany);
                $employee->setName($empData['name']);
                $employee->setIsActive(true);
                $employee->setIdentificationNumber($empData['identificationNumber']);

                if (isset($data['user'][$index])) {
                    $employee->setPosition($data['user'][$index]['role']);
                }

                $tenantEm->persist($employee);
            }

            foreach ($data['user'] as $userData) {
                $user = new User();
                $user->setCompany($tenantCompany);
                $user->setName($userData['name']);
                $user->setEmail($userData['email']);
                $user->setPassword($userData['password']);
                $user->setRole($userData['role']);
                $user->setPhoneNumber($userData['phoneNumber']);
                $tenantEm->persist($user);
            }

            foreach ($data['subscription'] as $subscriptionData) {
                $subscription = new Subscription();
                $subscription->setCompany($tenantCompany);
                $subscription->setStatus('active');
                $subscription->setStartDate(new \DateTime($subscriptionData['startDate']));
                $subscription->setEndDate(new \DateTime($subscriptionData['endDate']));
                $subscription->setAmount($subscriptionData['amount']);
                $subscription->setType($subscriptionData['type']);
                $subscription->setPaymentToken($subscriptionData['paymentToken']);
                $subscription->setBankReference($subscriptionData['bankReference']);

                $planPrincipal = $em->getRepository(Plan::class)->find($subscriptionData['planId']);
                if (!$planPrincipal) {
                    throw new \Exception('Plan no encontrado en la base de datos principal.');
                }

                $planTenant = new Plan();
                $planTenant->setName($planPrincipal->getName());
                $planTenant->setDescription($planPrincipal->getDescription());
                $planTenant->setEmployeeLimit($planPrincipal->getEmployeeLimit());
                $planTenant->setStatus($planPrincipal->getStatus());
                $planTenant->setPrice($planPrincipal->getPrice());
                $tenantEm->persist($planTenant);
                $tenantEm->flush();

                $subscription->setPlan($planTenant);
                $tenantEm->persist($subscription);
            }

            $tenantEm->flush();

        } catch (\Exception $exception) {
            return new JsonResponse(['error' => $exception->getMessage()], 500);
        }

        return new JsonResponse(['message' => 'Company saved successfully'], 201, [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Accept',
        ]);
    }
}
