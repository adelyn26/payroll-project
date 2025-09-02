<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250902233934 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE company (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, rnc VARCHAR(100) NOT NULL, sector VARCHAR(100) NOT NULL, address VARCHAR(100) NOT NULL, phone_number VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, amount_employee VARCHAR(100) NOT NULL, database_name VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE deduction (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, amount INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE document (id INT AUTO_INCREMENT NOT NULL, employee_id INT NOT NULL, doc_type VARCHAR(255) NOT NULL, file_path VARCHAR(255) NOT NULL, INDEX IDX_D8698A768C03F15C (employee_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE employee (id INT AUTO_INCREMENT NOT NULL, company_id INT NOT NULL, identification_number VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, position VARCHAR(255) NOT NULL, salary INT NOT NULL, hiring_date DATE NOT NULL, period_end DATE NOT NULL, is_active TINYINT(1) NOT NULL, type_of_contract VARCHAR(255) NOT NULL, INDEX IDX_5D9F75A1979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE income (id INT AUTO_INCREMENT NOT NULL, payroll_id INT NOT NULL, type VARCHAR(255) NOT NULL, amount DOUBLE PRECISION NOT NULL, INDEX IDX_3FA862D0DBA340EA (payroll_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE leave_request (id INT AUTO_INCREMENT NOT NULL, employee_id INT NOT NULL, leave_type VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, status VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, INDEX IDX_7DC8F7788C03F15C (employee_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE payroll (id INT AUTO_INCREMENT NOT NULL, employee_id INT NOT NULL, pay_mode VARCHAR(255) NOT NULL, gross_pay INT NOT NULL, net_pay INT NOT NULL, INDEX IDX_499FBCC68C03F15C (employee_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE payroll_deduction (payroll_id INT NOT NULL, deduction_id INT NOT NULL, INDEX IDX_DF631516DBA340EA (payroll_id), INDEX IDX_DF6315162319F88E (deduction_id), PRIMARY KEY(payroll_id, deduction_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE plan (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, employee_limit INT NOT NULL, status TINYINT(1) NOT NULL, price NUMERIC(10, 0) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE subscription (id INT AUTO_INCREMENT NOT NULL, plan_id INT NOT NULL, company_id INT NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, status TINYINT(1) NOT NULL, type VARCHAR(255) NOT NULL, bank_reference VARCHAR(100) DEFAULT NULL, payment_token VARCHAR(100) DEFAULT NULL, amount NUMERIC(10, 0) DEFAULT NULL, INDEX IDX_A3C664D3E899029B (plan_id), UNIQUE INDEX UNIQ_A3C664D3979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, company_id INT NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, INDEX IDX_8D93D649979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE document ADD CONSTRAINT FK_D8698A768C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A1979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE income ADD CONSTRAINT FK_3FA862D0DBA340EA FOREIGN KEY (payroll_id) REFERENCES payroll (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE leave_request ADD CONSTRAINT FK_7DC8F7788C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)
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
        $this->addSql(<<<'SQL'
            ALTER TABLE subscription ADD CONSTRAINT FK_A3C664D3E899029B FOREIGN KEY (plan_id) REFERENCES plan (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE subscription ADD CONSTRAINT FK_A3C664D3979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user ADD CONSTRAINT FK_8D93D649979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE document DROP FOREIGN KEY FK_D8698A768C03F15C
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE employee DROP FOREIGN KEY FK_5D9F75A1979B1AD6
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE income DROP FOREIGN KEY FK_3FA862D0DBA340EA
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE leave_request DROP FOREIGN KEY FK_7DC8F7788C03F15C
        SQL);
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
            ALTER TABLE subscription DROP FOREIGN KEY FK_A3C664D3E899029B
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE subscription DROP FOREIGN KEY FK_A3C664D3979B1AD6
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user DROP FOREIGN KEY FK_8D93D649979B1AD6
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE company
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE deduction
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE document
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE employee
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE income
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE leave_request
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE payroll
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE payroll_deduction
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE plan
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE subscription
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user
        SQL);
    }
}
