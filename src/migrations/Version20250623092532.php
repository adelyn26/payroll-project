<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250623092532 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE deduction DROP FOREIGN KEY FK_6E3D6F93DBA340EA
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_6E3D6F93DBA340EA ON deduction
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE deduction DROP payroll_id
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE deduction ADD payroll_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE deduction ADD CONSTRAINT FK_6E3D6F93DBA340EA FOREIGN KEY (payroll_id) REFERENCES payroll (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_6E3D6F93DBA340EA ON deduction (payroll_id)
        SQL);
    }
}
