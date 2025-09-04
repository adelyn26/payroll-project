<?php

namespace App\Entity;

use App\Repository\subscriptionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: subscriptionRepository::class)]
#[ORM\Table(name: 'subscription')]
class subscription
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column(type: 'date', length: 255)]
    private ?\DateTimeInterface $startDate = null;
    #[ORM\Column(type: 'date', length: 255)]
    private ?\DateTimeInterface $endDate = null;
    #[ORM\Column(type: 'boolean', length: 255)]
    private string $status;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $type = null;
    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    private ?string $bankReference = null;
    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    private ?string $paymentToken = null;
    #[ORM\Column(type: 'decimal', length: 100, nullable: true)]
    private ?float $amount = null;
    #[ORM\ManyToOne(inversedBy: 'plan')]
    #[ORM\JoinColumn(nullable: false)]
    private ?plan $plan = null;
    #[ORM\OneToOne(inversedBy: 'subscription')]
    #[ORM\JoinColumn(nullable: false)]
    private ?company $company = null;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }
    public function setStartDate(\DateTimeInterface $startDate): void
    {
        $this->startDate = $startDate;
    }
    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }
    public function setEndDate(\DateTimeInterface $endDate): void
    {
        $this->endDate = $endDate;
    }
    public function getStatus(): ?string
    {
        return $this->status;
    }
    public function setStatus(string $status): void
    {
        $this->status = $status;
    }
    public function getPlan(): ?plan
    {
       return $this->plan;
    }
    public function setPlan(plan $plan): void
    {
        $this->plan = $plan;
    }
    public function getCompany(): ?company
    {
        return $this->company;
    }
    public function setCompany(company $company): void
    {
        $this->company = $company;
    }
    public function getType(): ?string
    {
        return $this->type;
    }
    public function setType(string $type): void
    {
        $this->type = $type;
    }
    public function getBankReference(): ?string
    {
        return $this->bankReference;
    }
    public function setBankReference(string $bankReference): void
    {
        $this->bankReference = $bankReference;
    }
    public function getPaymentToken(): ?string
    {
        return $this->paymentToken;
    }
    public function setPaymentToken(string $paymentToken): void
    {
        $this->paymentToken = $paymentToken;
    }
    public function getAmount(): ?float
    {
        return $this->amount;
    }
    public function setAmount(float $amount): void
    {
        $this->amount = $amount;
    }
}