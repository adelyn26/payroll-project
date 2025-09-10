<?php

namespace App\Service;

use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Process\Process;

class TenantDatabaseManager
{
    private EntityManagerInterface $defaultEm;

    public function __construct(EntityManagerInterface $defaultEm, )
    {
        $this->defaultEm = $defaultEm;
    }

    public function createAndMigrateTenant(string $dbName): void
    {
        $conn = $this->defaultEm->getConnection();

        try {
            $conn->executeStatement(
                sprintf(
                    "CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
                    $dbName
                )
            );
        } catch (\Exception $e) {
            throw new \RuntimeException('Error creando la base de datos: ' . $e->getMessage());
        }

        $params = $conn->getParams();
        $params['dbname'] = $dbName;

        $tenantConn = DriverManager::getConnection($params);
        $tenantEm = new EntityManager($tenantConn, $this->defaultEm->getConfiguration());

        $databaseUrl = sprintf(
            'mysql://%s:%s@%s:%s/%s',
            $params['user'],
            $params['password'] ?? '',
            $params['host'],
            $params['port'] ?? 3306,
            $dbName
        );

        $process = new Process([
            'php',
            __DIR__ . '/../../bin/console',
            'doctrine:migrations:migrate',
            '--no-interaction',
        ], null, ['DATABASE_URL' => $databaseUrl]);

        $process->setTimeout(null);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new \RuntimeException(
                'Error ejecutando migraciones: '
                . $process->getErrorOutput()
                . ' --- STDOUT: '
                . $process->getOutput()
            );
        }

        echo "Migraciones ejecutadas correctamente para $dbName\n";
    }
}
