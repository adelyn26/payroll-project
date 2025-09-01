<?php

namespace App\src\Repository;

use App\Entity\document;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<document>
 *
 * @method document|null find($id, $lockMode = null, $lockVersion = null)
 * @method document|null findOneBy(array $criteria, array $orderBy = null)
 * @method document[]    findAll()
 * @method document[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class documentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, document::class);
    }
}