<?php

namespace App\Repository;

use App\Entity\Albumtype;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Albumtype>
 *
 * @method Albumtype|null find($id, $lockMode = null, $lockVersion = null)
 * @method Albumtype|null findOneBy(array $criteria, array $orderBy = null)
 * @method Albumtype[]    findAll()
 * @method Albumtype[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AlbumtypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Albumtype::class);
    }

//    /**
//     * @return Albumtype[] Returns an array of Albumtype objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Albumtype
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
