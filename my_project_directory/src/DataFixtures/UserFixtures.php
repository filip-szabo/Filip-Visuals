<?php

namespace App\DataFixtures;

use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
       $user = new Users();
       $user->setName('Filip Szabo');
       $user->setSchool('Liceul National De Informatica');
       $user->setClass('12A');
       $manager->persist($user);

        $user2 = new Users();
        $user2->setName('Alexandru Ioan');
        $user2->setSchool('Pedagogic');
        $user2->setClass('8B');
        $manager->persist($user2);

        $manager->flush();
    }
}
