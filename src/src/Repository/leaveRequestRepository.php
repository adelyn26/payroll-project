<?php

namespace App\Repository;

use App\Entity\leaveRequest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<leaveRequest>
 *
 * @method leaveRequest|null find($id, $lockMode = null, $lockVersion = null)
 * @method leaveRequest|null findOneBy(array $criteria, array $orderBy = null)
 * @method leaveRequest[]    findAll()
 * @method leaveRequest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class leaveRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, leaveRequest::class);
    }
}