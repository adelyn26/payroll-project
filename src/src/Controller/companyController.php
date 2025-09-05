<?php

namespace App\Controller;

use App\Entity\company;
use App\Entity\document;
use App\Entity\employee;
use App\Entity\leaveRequest;
use App\Entity\payroll;
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
            $employee = new Employee();
            foreach ($data['employee'] as $empData) {
                $employee->setCompany($company);
                $employee->setName($empData['name']);
                $employee->setSalary($empData['salary']);
                $employee->setIdentificationNumber($empData['identificationNumber']);
                $employee->setHiringDate(new \DateTime($empData['hiringDate']));
                $employee->setPosition($empData['position']);
                $employee->setTypeOfContract($empData['typeOfContract']);
                $employee->setPeriodEnd($empData['periodEnd']);

                $company->addEmployee($employee);
            }
            foreach ($data['document'] as $docData) {
                $document = new Document();
                $document->setEmployee($employee);
                $document->setDocType($docData['docType']);
                $document->setFilePath($docData['filePath']);

                $employee->addDocument($document);
            }
            foreach ($data['payroll'] as $payrollData) {
                $payroll =  new Payroll();
                $payroll->setEmployee($employee);
                $payroll->setGrossPay($payrollData['grossPay']);
                $payroll->setNetPay($payrollData['netPay']);
            }
            foreach ($data['leaveRequest'] as $leaveRequestData) {
                $leaveRequest =  new LeaveRequest();
                $leaveRequest->setEmployee($employee);
                $leaveRequest->setLeaveType($leaveRequestData['leaveType']);
                $leaveRequest->setStartDate(new \DateTime($leaveRequestData['startDate']));
                $leaveRequest->setEndDate(new \DateTime($leaveRequestData['endDate']));
                $leaveRequest->setReason($leaveRequestData['reason']);
            }
            foreach ($data['user'] as $userData) {
                $user =  new user();
                $user->setCompany($company);
                $user->setName($userData['name']);
                $user->setEmail($userData['email']);
                $user->setPassword($userData['password']);
                $user->setRole($userData['role']);
            }
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