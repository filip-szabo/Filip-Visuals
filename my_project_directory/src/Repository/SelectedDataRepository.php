<?php

namespace App\Repository;

use App\Entity\SelectedData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SelectedData>
 *
 * @method SelectedData|null find($id, $lockMode = null, $lockVersion = null)
 * @method SelectedData|null findOneBy(array $criteria, array $orderBy = null)
 * @method SelectedData[]    findAll()
 * @method SelectedData[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SelectedDataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SelectedData::class);
    }

//    /**
//     * @return SelectedData[] Returns an array of SelectedData objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SelectedData
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
