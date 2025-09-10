<?php

namespace App\Entity;

use App\Repository\deductionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
    #[ORM\ManyToMany(targetEntity: payroll::class, inversedBy: 'deductions')]
    #[ORM\JoinTable(name: 'payroll_deductions')]
    private Collection $payroll;
    public function __construct()
    {
        $this->payroll = new ArrayCollection();
    }
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
    public function getPayrolls(): Collection
    {
        return $this->payroll;
    }

    public function addPayroll(Payroll $payroll): self
    {
        if (!$this->payroll->contains($payroll)) {
            $this->payroll->add($payroll);
        }

        return $this;
    }

    public function removePayroll(Payroll $payroll): self
    {
        $this->payroll->removeElement($payroll);
        return $this;
    }
}
