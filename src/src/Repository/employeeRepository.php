<?php

namespace App\Repository;

use App\Entity\employee;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<employee>
 *
 * @method employee|null find($id, $lockMode = null, $lockVersion = null)
 * @method employee|null findOneBy(array $criteria, array $orderBy = null)
 * @method employee[]    findAll()
 * @method employee[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class employeeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, employee::class);
    }

}