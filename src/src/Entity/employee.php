<?php

namespace App\Entity;

use App\Repository\employeeRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: employeeRepository::class)]
#[ORM\Table(name: 'employee')]
class employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;
    #[ORM\Column(type: 'integer', length: 255)]
    private ?int $id_number = null;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $name = null;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $position = null;
    #[ORM\Column(type: 'integer', length: 255)]
    private ?int $salary = null;
    #[ORM\Column(type: 'date', length: 255)]
    private ?\DateTimeInterface $hiringDate = null;
    #[ORM\Column(type: 'date', length: 255)]
    private ?\DateTimeInterface $periodEnd = null;
    #[ORM\Column(type: 'boolean', length: 255)]
    private ?bool $isActive = null;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $typeOfContract = null;
    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Payroll::class, cascade: ['persist', 'remove'])]
    private Collection $payrolls;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getIdentificationNumber(): ?int
    {
        return $this->id_number;
    }

    public function setIdentificationNumber(int $id_number): static
    {
        $this->id_number = $id_number;

        return $this;
    }
    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
    public function getPosition(): ?string
    {
        return $this->position;
    }
    public function setPosition(string $position): static
    {
        $this->position = $position;

        return $this;
    }
    public function getSalary(): ?int
    {
        return $this->salary;
    }
    public function setSalary(int $salary): static
    {
        $this->salary = $salary;

        return $this;
    }
    public function getHiringDate(): ?\DateTimeInterface
    {
        return $this->hiringDate;
    }
    public function setHiringDate(\DateTimeInterface $hiringDate): void
    {
        $this->hiringDate = $hiringDate;
    }
    public function getPeriodEnd(): ?\DateTimeInterface
    {
        return $this->periodEnd;
    }
    public function setPeriodEnd(\DateTimeInterface $periodEnd): void
    {
        $this->periodEnd = $periodEnd;
    }
    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }
    public function setIsActive(bool $isActive): void
    {
        $this->isActive = $isActive;
    }
    public function getTypeOfContract(): ?string
    {
        return $this->typeOfContract;
    }
    public function setTypeOfContract(string $typeOfContract): void
    {
        $this->typeOfContract = $typeOfContract;
    }

}
