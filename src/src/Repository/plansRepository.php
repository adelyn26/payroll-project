<?php

namespace App\Repository;

use App\Entity\plans;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<plans>
 *
 * @method plans|null find($id, $lockMode = null, $lockVersion = null)
 * @method plans|null findOneBy(array $criteria, array $orderBy = null)
 * @method plans[]    findAll()
 * @method plans[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class plansRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, plans::class);
    }

}