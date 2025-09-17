<?php

namespace App\DataFixtures;

use App\Entity\Plan;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;

class PlanFixtures extends Fixture implements FixtureGroupInterface
{
    /**
     * Este fixture pertenece solo al grupo "plan".
     * Se cargará únicamente cuando se ejecute:
     * php bin/console doctrine:fixtures:load --group=plan
     */
    public static function getGroups(): array
    {
        return ['plan'];
    }

    public function load(ObjectManager $manager): void
    {
        $plans = [
            [
                'name' => 'Básico',
                'description' => 'Plan para pequeñas empresas',
                'employeeLimit' => 10,
                'status' => true,
                'price' => 49.99,
            ],
            [
                'name' => 'Profesional',
                'description' => 'Plan para empresas medianas',
                'employeeLimit' => 50,
                'status' => true,
                'price' => 99.99,
            ],
            [
                'name' => 'Enterprise',
                'description' => 'Plan para grandes empresas',
                'employeeLimit' => 500,
                'status' => true,
                'price' => 199.99,
            ],
        ];

        foreach ($plans as $data) {
            $plan = new Plan();
            $plan->setName($data['name']);
            $plan->setDescription($data['description']);
            $plan->setEmployeeLimit($data['employeeLimit']);
            $plan->setStatus($data['status']);
            $plan->setPrice($data['price']);

            $manager->persist($plan);
        }

        $manager->flush();
    }
}
