<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250828204723 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE deduction (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, amount INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE employee (id INT AUTO_INCREMENT NOT NULL, id_number INT NOT NULL, name VARCHAR(255) NOT NULL, position VARCHAR(255) NOT NULL, salary INT NOT NULL, hiring_date DATE NOT NULL, period_end DATE NOT NULL, is_active TINYINT(1) NOT NULL, type_of_contract VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE payroll (id INT AUTO_INCREMENT NOT NULL, employee_id INT NOT NULL, pay_mode VARCHAR(255) NOT NULL, gross_pay INT NOT NULL, net_pay INT NOT NULL, INDEX IDX_499FBCC68C03F15C (employee_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE payroll_deduction (payroll_id INT NOT NULL, deduction_id INT NOT NULL, INDEX IDX_DF631516DBA340EA (payroll_id), INDEX IDX_DF6315162319F88E (deduction_id), PRIMARY KEY(payroll_id, deduction_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE payroll ADD CONSTRAINT FK_499FBCC68C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)
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
            ALTER TABLE payroll DROP FOREIGN KEY FK_499FBCC68C03F15C
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE payroll_deduction DROP FOREIGN KEY FK_DF631516DBA340EA
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE payroll_deduction DROP FOREIGN KEY FK_DF6315162319F88E
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE deduction
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE employee
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE payroll
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE payroll_deduction
        SQL);
    }
}
