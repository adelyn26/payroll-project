<?php

declare(strict_types=1);

namespace App\assets;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250623103421 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE payroll_deduction (payroll_id INT NOT NULL, deduction_id INT NOT NULL, INDEX IDX_DF631516DBA340EA (payroll_id), INDEX IDX_DF6315162319F88E (deduction_id), PRIMARY KEY(payroll_id, deduction_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE payroll_deduction ADD CONSTRAINT FK_DF631516DBA340EA FOREIGN KEY (payroll_id) REFERENCES payroll (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE payroll_deduction ADD CONSTRAINT FK_DF6315162319F88E FOREIGN KEY (deduction_id) REFERENCES deduction (id) ON DELETE CASCADE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE payroll_deduction DROP FOREIGN KEY FK_DF631516DBA340EA
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE payroll_deduction DROP FOREIGN KEY FK_DF6315162319F88E
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE payroll_deduction
        SQL);
    }
}
