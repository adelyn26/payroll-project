<?php
namespace App\Service;

use Doctrine\DBAL\Connection;
use Symfony\Component\Process\Process;

class tenantManager
{
    public function __construct(private readonly Connection $connection) {}

    public function createTenantDatabase(string $dbName): void
    {
        $sql = sprintf('CREATE DATABASE `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', $dbName);
        $this->connection->executeStatement($sql);

        $process = new Process([
            'php', 'bin/console', 'doctrine:migrations:migrate',
            '--no-interaction',
            '--em=tenant',
            sprintf('--db=%s', $dbName)
        ]);

        $process->setTimeout(null);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new \RuntimeException('Error executing migrations: '.$process->getErrorOutput());
        }
    }
}
