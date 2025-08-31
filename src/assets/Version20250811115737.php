<?php

declare(strict_types=1);

namespace App\assets;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250811115737 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE employee ADD type_of_contract VARCHAR(255) NOT NULL, CHANGE salary salary INT NOT NULL, CHANGE period_end period_end DATE NOT NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE employee DROP type_of_contract, CHANGE salary salary INT DEFAULT NULL, CHANGE period_end period_end DATE DEFAULT NULL
        SQL);
    }
}
