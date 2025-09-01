<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250829122548 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE document (id INT AUTO_INCREMENT NOT NULL, employee_id INT NOT NULL, doc_type VARCHAR(255) NOT NULL, file_path VARCHAR(255) NOT NULL, INDEX IDX_D8698A768C03F15C (employee_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE income (id INT AUTO_INCREMENT NOT NULL, payroll_id INT NOT NULL, type VARCHAR(255) NOT NULL, amount DOUBLE PRECISION NOT NULL, INDEX IDX_3FA862D0DBA340EA (payroll_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE leave_request (id INT AUTO_INCREMENT NOT NULL, employee_id INT NOT NULL, leave_type VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, status VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, INDEX IDX_7DC8F7788C03F15C (employee_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE document ADD CONSTRAINT FK_D8698A768C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE income ADD CONSTRAINT FK_3FA862D0DBA340EA FOREIGN KEY (payroll_id) REFERENCES payroll (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE leave_request ADD CONSTRAINT FK_7DC8F7788C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE document DROP FOREIGN KEY FK_D8698A768C03F15C
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE income DROP FOREIGN KEY FK_3FA862D0DBA340EA
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE leave_request DROP FOREIGN KEY FK_7DC8F7788C03F15C
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE document
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE income
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE leave_request
        SQL);
    }
}
