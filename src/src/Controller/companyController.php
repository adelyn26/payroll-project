<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\Employee;
use App\Entity\User;
use App\Entity\Plan;
use App\Entity\Subscription;
use App\Service\TenantDatabaseManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class companyController extends AbstractController
{
    #[Route('/register-company', name: 'register_company')]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        TenantDatabaseManager $tenantDbManager
    ): Response
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

        $name = $data['name'];
        $dbName = 'kube_' . strtolower($name);

        try {
            // Guardar company
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

            // Guardar empleados
            foreach ($data['employee'] as $empData) {
                $employee = new Employee();
                $employee->setCompany($company);
                $employee->setName($empData['name']);
                $employee->setSalary($empData['salary']);
                $employee->setIdentificationNumber($empData['identificationNumber']);
                $employee->setHiringDate(new \DateTime($empData['hiringDate']));
                $employee->setPosition($empData['position']);
                $employee->setTypeOfContract($empData['typeOfContract']);
                $employee->setPeriodEnd(new \DateTime($empData['periodEnd']));
                $employee->setIsActive(true);
                $company->addEmployee($employee);
            }

            // Guardar usuarios
            foreach ($data['user'] as $userData) {
                $user = new User();
                $user->setCompany($company);
                $user->setName($userData['name']);
                $user->setEmail($userData['email']);
                $user->setPassword($userData['password']);
                $user->setRole($userData['role']);
                $user->setPhoneNumber($userData['phoneNumber']);
            }

            // Guardar plan y suscripción
            $plan = new Plan();
            foreach ($data['subscription'] as $subscriptionData) {
                $subscription = new Subscription();
                $subscription->setCompany($company);
                $subscription->setStatus('active');
                $subscription->setStartDate(new \DateTime($subscriptionData['startDate']));
                $subscription->setEndDate(new \DateTime($subscriptionData['endDate']));
                $subscription->setAmount($subscriptionData['amount']);
                $subscription->setType($subscriptionData['type']);
                $subscription->setPlan($plan);
                $subscription->setPaymentToken($subscriptionData['paymentToken']);
                $subscription->setBankReference($subscriptionData['bankReference']);
            }

            $em->flush();

            // Crear base de datos tenant y ejecutar migraciones
            $tenantDbManager->createAndMigrateTenant($dbName);

        } catch (\Exception $exception) {
            return new JsonResponse(['error' => $exception->getMessage()], 500);
        }

        $response = new JsonResponse(['message' => 'Company saved successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $response;
    }
}
