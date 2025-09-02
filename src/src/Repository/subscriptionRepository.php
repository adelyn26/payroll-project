<?php

namespace App\Repository;

use App\Entity\subscription;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<subscription>
 *
 * @method subscription|null find($id, $lockMode = null, $lockVersion = null)
 * @method subscription|null findOneBy(array $criteria, array $orderBy = null)
 * @method subscription[]    findAll()
 * @method subscription[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class subscriptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, subscription::class);
    }
}