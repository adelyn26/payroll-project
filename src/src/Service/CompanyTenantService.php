<?php

namespace App\Service;

use App\Entity\Company;
use App\Entity\Employee;
use App\Entity\user;
use App\Entity\Subscription;
use App\Entity\Plan;
use Doctrine\ORM\EntityManagerInterface;

class CompanyTenantService
{
    private TenantDatabaseManager $tenantDbManager;
    private EntityManagerInterface $mainEm;

    public function __construct(TenantDatabaseManager $tenantDbManager, EntityManagerInterface $mainEm)
    {
        $this->tenantDbManager = $tenantDbManager;
        $this->mainEm = $mainEm;
    }

    public function setupTenant(Company $mainCompany, array $data): void
    {
        $dbName = $mainCompany->getDatabaseName();

        // Crear DB tenant
        $this->tenantDbManager->createAndMigrateTenant($dbName);
        $tenantEm = $this->tenantDbManager->getTenantEntityManager($dbName);

        // Crear compañía en tenant
        $tenantCompany = new Company();
        $tenantCompany->setName($mainCompany->getName());
        $tenantCompany->setDatabaseName($dbName);
        $tenantCompany->setAmountEmployee($mainCompany->getAmountEmployee());
        $tenantCompany->setAddress($mainCompany->getAddress());
        $tenantCompany->setEmail($mainCompany->getEmail());
        $tenantCompany->setPhoneNumber($mainCompany->getPhoneNumber());
        $tenantCompany->setRnc($mainCompany->getRnc());
        $tenantCompany->setSector($mainCompany->getSector());

        $tenantEm->persist($tenantCompany);

        // Empleados
        foreach ($data['employee'] as $index => $empData) {
            $employee = new Employee();
            $employee->setCompany($tenantCompany);
            $employee->setName($empData['name']);
            $employee->setIsActive(true);
            $employee->setIdentificationNumber($empData['identificationNumber'] ?? null);

            if (isset($data['user'][$index]['role'])) {
                $employee->setPosition($data['user'][$index]['role']);
            } else {
                $employee->setPosition('Empleado'); // valor por defecto
            }
            $tenantEm->persist($employee);
        }

        // Usuarios
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

        // Suscripciones
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

            // Clonar el plan desde la DB principal
            $planPrincipal = $this->mainEm->getRepository(Plan::class)->find($subscriptionData['planId']);
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
    }
}
