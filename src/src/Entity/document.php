<?php

namespace App\Entity;

use App\Repository\documentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: documentRepository::class)]
#[ORM\Table(name: 'document')]
class document
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $docType = null;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $filePath = null;
    #[ORM\ManyToOne(targetEntity: employee::class, inversedBy: 'document')]
    #[ORM\JoinColumn(nullable: true)]
    private Employee $employee;
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getDocType(): ?string
    {
        return $this->docType;
    }
    public function setDocType(string $docType): void
    {
        $this->docType = $docType;
    }
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }
    public function setFilePath(string $filePath): void
    {
        $this->filePath = $filePath;
    }
    public function getStatus(): ?string
    {
        return $this->docType;
    }
    public function getEmployee(): Employee
    {
        return $this->employee;
    }
    public function setEmployee(Employee $employee): void
    {
        $this->employee = $employee;
    }
}