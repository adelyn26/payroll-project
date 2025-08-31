<?php

namespace App\Entity;

use App\Repository\payrollRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: payrollRepository::class)]
#[ORM\Table(name: 'payroll')]
class payroll
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column(type: 'string', length: 255)]
    private string $payMode;
    #[ORM\Column(type: 'integer', length: 255)]
    private int $grossPay;
    #[ORM\Column(type: 'integer', length: 255)]
    private int $netPay;
    #[ORM\ManyToOne(targetEntity: employee::class, inversedBy: 'payrolls')]
    #[ORM\JoinColumn(nullable: false)]
    private Employee $employee;
    #[ORM\ManyToMany(targetEntity: Deduction::class)]
    #[ORM\JoinTable(name: 'payroll_deduction')]
    private Collection $deductions;
    #[ORM\OneToMany(mappedBy: 'payroll', targetEntity: income::class, cascade: ['persist', 'remove'])]
    private Collection $incomes;

    public function __construct()
    {
        $this->deductions = new ArrayCollection();
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPayMode(): string
    {
        return $this->payMode;
    }

    public function setPayMode(string $payMode): void
    {
        $this->payMode = $payMode;
    }
    public function getGrossPay(): ?float
    {
        return $this->grossPay;
    }

    public function setGrossPay(int $grossPay): void
    {
        $this->grossPay = $grossPay;
    }
    public function getNetPay(): float
    {
        return $this->netPay;
    }

    public function setNetPay(int $netPay): void
    {
        $this->netPay = $netPay;
    }

    public function getEmployee(): employee
    {
        return $this->employee;
    }

    public function setEmployee(employee $employee): void
    {
        $this->employee = $employee;
    }
    public function getDeduction(): Collection
    {
        return $this->deductions;
    }
    public function addDeduction(Deduction $deduction): void
    {
        if (!$this->deductions->contains($deduction)) {
            $this->deductions[] = $deduction;
        }
    }


}
