<?php

namespace App\Controller;

use App\Entity\deduction;
use App\Entity\employee;
use App\Entity\payroll;
use App\Repository\payrollRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class payrollController extends AbstractController
{
    #[Route('/api/save-payroll', name: 'save_payroll', methods: ['POST', 'OPTIONS'])]
    public function savePayroll(Request $request, EntityManagerInterface $entityManager, LoggerInterface $logger): JsonResponse
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
        $employee = $entityManager->getRepository(employee::class)->findOneBy(['name' => $data['employee']]);
        $payroll = $entityManager->getRepository(payroll::class)->findOneBy(['employee' => $employee]);

        if ($payroll && null !== $payroll->getGrossPay()) {
            $logger->info('Gross Pay exists: '.$payroll->getGrossPay());
        } else {
            $logger->info('Gross Pay is empty or payroll record not found');
        }

        $payroll = new payroll();
        $deductionIds = $data['deduction'] ?? [];
        foreach ($deductionIds as $deductionId) {
            $deduction = $entityManager->getRepository(deduction::class)->find($deductionId);
            if ($deduction) {
                $payroll->addDeduction($deduction);
            }
        }
        if ($employee) {
            $employee->setSalary($data['netPay']);
        }
        $payroll->setNetPay($data['netPay']);
        $payroll->setGrossPay($data['grossPay']);
        $payroll->setPayMode($data['payMode']);
        $payroll->setEmployee($employee);

        $entityManager->persist($employee);
        $entityManager->persist($payroll);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Payroll saved successfully'], 201);
    }

    #[Route('/api/payroll', name: 'fetch_payroll', methods: ['GET', 'OPTIONS'])]
    public function fetchPayroll(Request $request, payrollRepository $payrollRepository): JsonResponse
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        $payroll = $payrollRepository->findAll();
        $data = array_map(fn ($payroll) => [
            'id' => $payroll->getId(),
            'employee' => $payroll->getEmployee(),
            'grossPay' => $payroll->getGrossPay(),
            'netPay' => $payroll->getNetPay(),
        ], $payroll);

        $response = new JsonResponse(['message' => 'Game fetch successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $this->json($data);
    }

    #[Route('/api/payroll-deduction', name: 'fetch_payroll_deduction', methods: ['GET', 'OPTIONS'])]
    public function fetchPayrollDeduction(Request $request, payrollRepository $payrollRepository): JsonResponse
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        $summary = $payrollRepository->countDeductionsForActiveEmployees();

        $response = new JsonResponse(['message' => 'Game fetch successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $this->json($summary);
    }

    #[Route('/api/payroll/{id}', name: 'fetch_payroll_by_id', methods: ['PUT', 'OPTIONS'])]
    public function fetchPayrollById(Request $request, $id, EntityManagerInterface $entityManager, LoggerInterface $logger): JsonResponse
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data[0]) && is_array($data[0])) {
            $data = $data[0];
        }

        $payroll = $entityManager->getRepository(payroll::class)->findOneBy(['employee' => $id]);
        $payroll->setGrossPay($data['grossPay'] ?? $payroll->getGrossPay());
        $payroll->setNetPay($data['netPay'] ?? $payroll->getNetPay());
        $payroll->setPayMode($data['payMode'] ?? $payroll->getPayMode());

        if (!empty($data['deduction'])) {
            foreach ($data['deduction'] as $deductionId) {
                $deduction = $entityManager->getRepository(deduction::class)->find($deductionId);
                if ($deduction) {
                    $payroll->addDeduction($deduction);
                }
            }
        }

        if (!empty($data['employee'])) {
            $employee = $entityManager->getRepository(employee::class)->find($data['employee']);
            if ($employee) {
                $payroll->setEmployee($employee);
            }
        }

        $entityManager->persist($payroll);
        $entityManager->flush();

        $data = [
            'employee_id' => $payroll->getId(),
            'employee' => $payroll->getEmployee(),
            'grossPay' => $payroll->getGrossPay(),
            'netPay' => $payroll->getNetPay(),
            'payMode' => $payroll->getPayMode(),
            'deduction' => $payroll->getDeduction()->map(fn ($d) => [
                'id' => $d->getId(),
                'type' => $d->getType(),
                'amount' => $d->getAmount(),
            ])->toArray(),
        ];

        $logger->error('array data: ', [$data]);

        $response = new JsonResponse(['message' => 'payroll fetch successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $this->json($data);
    }
}
