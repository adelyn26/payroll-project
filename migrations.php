<?php

use Doctrine\Migrations\DependencyFactory;
use Doctrine\Migrations\Configuration\Migration\ConfigurationArray;
use Doctrine\Migrations\Configuration\EntityManager\ExistingEntityManager;
use Doctrine\Persistence\ManagerRegistry;

return static function (ManagerRegistry $doctrine): DependencyFactory {
    /** @var \Doctrine\ORM\EntityManagerInterface $em */
    $em = $doctrine->getManager();
    if (!$em instanceof \Doctrine\ORM\EntityManagerInterface) {
        throw new \RuntimeException('El EntityManager obtenido no es un EntityManagerInterface');
    }

    $config = new ConfigurationArray([
        'migrations_paths' => [
            'App\Migrations' => __DIR__ . '/migrations',
        ],
        'all_or_nothing' => true,
        'check_database_platform' => true,
    ]);

    return DependencyFactory::fromEntityManager(
        $config,
        new ExistingEntityManager($em)
    );
};
