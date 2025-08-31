<?php

namespace App\Repository;

use App\Entity\company;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<company>
 *
 * @method company|null find($id, $lockMode = null, $lockVersion = null)
 * @method company|null findOneBy(array $criteria, array $orderBy = null)
 * @method company[]    findAll()
 * @method company[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class companyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, company::class);
    }
}