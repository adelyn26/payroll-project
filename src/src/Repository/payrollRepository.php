<?php

namespace App\Repository;

use App\Entity\payroll;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<payroll>
 *
 * @method payroll|null find($id, $lockMode = null, $lockVersion = null)
 * @method payroll|null findOneBy(array $criteria, array $orderBy = null)
 * @method payroll[]    findAll()
 * @method payroll[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class payrollRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, payroll::class);
    }

    public function countDeductionsForActiveEmployees(): array
    {
        $qb = $this->createQueryBuilder('p')
            ->select('d.type AS type, COUNT(d.id) AS total')
            ->innerJoin('p.deductions', 'd')
            ->innerJoin('p.employee', 'e')
            ->where('e.isActive = true')
            ->groupBy('d.id');

        return $qb->getQuery()->getResult();
    }
}
