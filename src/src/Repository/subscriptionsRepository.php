<?php

namespace App\Repository;

use App\Entity\subscriptions;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<subscriptions>
 *
 * @method subscriptions|null find($id, $lockMode = null, $lockVersion = null)
 * @method subscriptions|null findOneBy(array $criteria, array $orderBy = null)
 * @method subscriptions[]    findAll()
 * @method subscriptions[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class subscriptionsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, subscriptions::class);
    }
}