<?php

namespace App\Service;

use App\Entity\Company;
use Doctrine\ORM\EntityManagerInterface;

class CompanyMainService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function registerCompany(array $data): Company
    {
        $existingCompany = $this->em->getRepository(Company::class)->findOneBy(['rnc' => $data['rnc']]);
        if ($existingCompany) {
            throw new \Exception('La empresa ya está registrada.');
        }

        $dbName = 'kube_' . strtolower($data['name']);

        $company = new Company();
        $company->setName($data['name']);
        $company->setDatabaseName($dbName);
        $company->setAmountEmployee($data['amountEmployees']);
        $company->setAddress($data['address']);
        $company->setEmail($data['email']);
        $company->setPhoneNumber($data['phoneNumber']);
        $company->setRnc($data['rnc']);
        $company->setSector($data['sector']);

        $this->em->persist($company);
        $this->em->flush();

        return $company;
    }
}
