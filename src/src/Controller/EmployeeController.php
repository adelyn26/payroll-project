<?php

namespace App\Controller;

use App\Entity\employee;
use App\Repository\employeeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EmployeeController extends AbstractController
{
    #[Route('/api/save-employee', name: 'save_employee', methods: ['POST', 'OPTIONS'])]
<<<<<<< HEAD
    public function saveEmployee(Request $request, EntityManagerInterface $entityManager): JsonResponse
=======
    public function saveEmployee(Request $request, EntityManagerInterface $entityManager, LoggerInterface $logger): JsonResponse
>>>>>>> 9b4aa7a8d337da66bf2c1208b6bbca2bf433dbce
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }

        $data = json_decode($request->getContent(), true);
<<<<<<< HEAD

=======
        $logger->debug('save employee', ['data' => $data]);
>>>>>>> 9b4aa7a8d337da66bf2c1208b6bbca2bf433dbce
        if (!$data) {
            return new JsonResponse(['message' => 'Invalid JSON data'], 400);
        }

        try {
            $employee = new employee();
            $employee->setName($data['name']);
            $employee->setPosition($data['position']);
            $employee->setSalary((int) $data['salary']);
            $employee->setHiringDate(new \DateTime($data['hiringDate']));
            $employee->setPeriodEnd(new \DateTime($data['hiringDate']));
            $employee->setIsActive((bool) $data['isActive']);
<<<<<<< HEAD
            $employee->setIdentificationNumber($data['idNumber']);
=======
            $employee->setIdentificationNumber($data['identificationNumber']);
>>>>>>> 9b4aa7a8d337da66bf2c1208b6bbca2bf433dbce
            $employee->setTypeOfContract($data['contract']);

            $entityManager->persist($employee);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Employee saved successfully'], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/employee', name: 'fetch_employee', methods: ['GET', 'OPTIONS'])]
<<<<<<< HEAD
    public function fetchEmployee(Request $request, employeeRepository $employeeRepository): JsonResponse
=======
    public function fetchEmployee(Request $request, employeeRepository $employeeRepository, LoggerInterface $logger): JsonResponse
>>>>>>> 9b4aa7a8d337da66bf2c1208b6bbca2bf433dbce
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        $employee = $employeeRepository->findAll();
<<<<<<< HEAD
=======
        $logger->debug('todos los empleados: ', $employee );

>>>>>>> 9b4aa7a8d337da66bf2c1208b6bbca2bf433dbce
        $data = array_map(fn ($employee) => [
            'id' => $employee->getId(),
            'name' => $employee->getName(),
            'position' => $employee->getPosition(),
            'salary' => $employee->getSalary(),
            'hiringDate' => $employee->getHiringDate(),
            'periodEnd' => $employee->getPeriodEnd(),
            'idNumber' => $employee->getIdentificationNumber(),
            'isActive' => $employee->getIsActive(),
            'contract' => $employee->getTypeOfContract(),
        ], $employee);

        $response = new JsonResponse(['message' => 'Game fetch successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $this->json($data);
    }

    #[Route('/api/delete/{id}', name: 'delete_employee', methods: ['DELETE'])]
    public function deleteEmployee(Request $request, EntityManagerInterface $entityManager, $id): JsonResponse
    {
        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        $employee = $entityManager->getRepository(employee::class)->find($id);

        $entityManager->remove($employee);
        $entityManager->flush();

        if (!$employee) {
            $response = new JsonResponse(['message' => 'Employee not found'], Response::HTTP_NOT_FOUND);
        }
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return new JsonResponse(['message' => 'Employee deleted successfully'], Response::HTTP_OK);
    }

    #[Route('/api/update/{id}', name: 'update_employee', methods: ['PUT'])]
    public function updateEmployee(Request $request, EntityManagerInterface $entityManager, $id, LoggerInterface $logger): JsonResponse
    {
        $employee = $entityManager->getRepository(employee::class)->find($id);

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
        $employee->setName($data['name'] ?? $employee->getName());
        $employee->setPosition($data['position'] ?? $employee->getPosition());
        $employee->setSalary($data['salary'] ?? $employee->getSalary());
        $employee->setIsActive($data['isActive'] ?? $employee->getIsActive());
        $employee->setIdentificationNumber($data['id_number'] ?? $employee->getIdentificationNumber());
        $employee->setTypeOfContract($data['contract'] ?? $employee->getTypeOfContract());
        if (!empty($data['hiringDate'])) {
            $employee->setHiringDate(new \DateTime($data['hiringDate']));
        }
        if (!empty($data['periodEnd'])) {
            $employee->setPeriodEnd(new \DateTime($data['periodEnd']));
        }
        if (!$data) {
            return new JsonResponse(['message' => 'Invalid JSON data'], 400);
        }
        $entityManager->persist($employee);
        $entityManager->flush();

        $this->addFlash('success', 'Employee updated');

        $response = new JsonResponse(['message' => 'employee updated successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $this->json([
            'id' => $employee->getId(),
            'idNumber' => $employee->getIdentificationNumber(),
            'name' => $employee->getName(),
            'position' => $employee->getPosition(),
            'salary' => $employee->getSalary(),
            'hiringDate' => $employee->getHiringDate()->format('Y-m-d'),
            'periodEnd' => $employee->getPeriodEnd()?->format('Y-m-d'),
            'isActive' => $employee->getIsActive(),
            'contract' => $employee->getTypeOfContract(),
            'message' => 'Employee updated successfully',
        ]);
    }

    #[Route('/api/employee/{id}', name: 'get_employee', methods: ['GET'])]
    public function fetchEmployeeById(int $id, EntityManagerInterface $em, Request $request, LoggerInterface $logger): JsonResponse
    {
        $employee = $em->getRepository(employee::class)->find($id);

        if ('OPTIONS' === $request->getMethod()) {
            return new JsonResponse(null, 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }
        if (!$employee) {
            return $this->json(['message' => 'Employee not found'], 404);
        }
        $response = new JsonResponse(['message' => 'employee deleted successfully'], 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept');

        return $this->json([
            'id' => $employee->getId(),
            'idNumber' => $employee->getIdentificationNumber(),
            'name' => $employee->getName(),
            'position' => $employee->getPosition(),
            'salary' => $employee->getSalary(),
            'hiringDate' => $employee->getHiringDate()->format('Y-m-d'),
            'periodEnd' => $employee->getPeriodEnd()?->format('Y-m-d'),
            'isActive' => $employee->getIsActive(),
            'contract' => $employee->getTypeOfContract(),
        ]);
    }

    #[Route('/api/employees/stats', name: 'employee_stats', methods: ['GET'])]
    public function getEmployeeStats(EntityManagerInterface $em): JsonResponse
    {
        $repo = $em->getRepository(employee::class);

        $active = $repo->count(['isActive' => true]);
        $inactive = $repo->count(['isActive' => false]);

        return new JsonResponse([
            'active' => $active,
            'inactive' => $inactive,
        ]);
    }

    #[Route('/api/employee-by-department', name: 'employee_by_department')]
    public function employeeByDepartment(EntityManagerInterface $em): JsonResponse
    {
        $qb = $em->createQueryBuilder();

        $qb->select('e.position AS position', 'COUNT(e.id) AS total')
            ->from(employee::class, 'e')
            ->groupBy('e.position')
            ->orderBy('total', 'DESC');

        $results = $qb->getQuery()->getResult();

        $mappedResults = [];
        foreach ($results as $row) {
            $mappedResults[$row['position']] = (int) $row['total'];
        }

        return new JsonResponse($mappedResults);
    }
}
