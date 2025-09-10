<?php

namespace App\Repository;

use App\Entity\deduction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<deduction>
 *
 * @method deduction|null find($id, $lockMode = null, $lockVersion = null)
 * @method deduction|null findOneBy(array $criteria, array $orderBy = null)
 * @method deduction[]    findAll()
 * @method deduction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class deductionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, deduction::class);
    }
}