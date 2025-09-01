<?php

namespace App\Entity;

use App\Repository\incomeRepository;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity(repositoryClass: incomeRepository::class)]
#[ORM\Table(name: 'income')]
class income
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    public ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    public string $type;

    #[ORM\Column(type: 'float', length: 255)]
    public float $amount;

    #[ORM\ManyToOne(targetEntity: payroll::class, inversedBy: 'incomes')]
    #[ORM\JoinColumn(nullable: false)]
    private payroll $payroll;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getType(): string
    {
        return $this->type;
    }
    public function setType(string $type): void
    {
        $this->type = $type;
    }
    public function getAmount(): float
    {
        return $this->amount;
    }
    public function setAmount(float $amount): void
    {
        $this->amount = $amount;
    }
    public function getPayroll(): payroll
    {
        return $this->payroll;
    }
    public function setPayroll(payroll $payroll): void
    {
        $this->payroll = $payroll;
    }
}