<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250829123841 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE employee CHANGE company_id company_id INT NOT NULL, CHANGE identification_number identification_number VARCHAR(255) NOT NULL, CHANGE name name VARCHAR(255) NOT NULL, CHANGE position position VARCHAR(255) NOT NULL, CHANGE salary salary INT NOT NULL, CHANGE hiring_date hiring_date DATE NOT NULL, CHANGE period_end period_end DATE NOT NULL, CHANGE is_active is_active TINYINT(1) NOT NULL, CHANGE type_of_contract type_of_contract VARCHAR(255) NOT NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE employee CHANGE company_id company_id INT DEFAULT NULL, CHANGE identification_number identification_number INT DEFAULT NULL, CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE position position VARCHAR(255) DEFAULT NULL, CHANGE salary salary INT DEFAULT NULL, CHANGE hiring_date hiring_date DATE DEFAULT NULL, CHANGE period_end period_end DATE DEFAULT NULL, CHANGE is_active is_active TINYINT(1) DEFAULT NULL, CHANGE type_of_contract type_of_contract VARCHAR(255) DEFAULT NULL
        SQL);
    }
}
