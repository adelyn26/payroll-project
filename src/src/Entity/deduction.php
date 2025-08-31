<?php

namespace App\Entity;

use App\Repository\deductionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: deductionRepository::class)]
#[ORM\Table(name: 'deduction')]
class deduction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $type = null;
    #[ORM\Column(type: 'integer', length: 255)]
    private ?int $amount = null;
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): static
    {
        $this->amount = $amount;

        return $this;
    }
    public function getPayroll(): ?Payroll
    {
        return $this->payroll;
    }

    public function setPayroll(?Payroll $payroll): self
    {
        $this->payroll = $payroll;

        return $this;
    }
}
