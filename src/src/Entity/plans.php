<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: plans::class)]
#[ORM\Table(name: 'plans')]
class plans
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column(type: 'string', length: 255)]
    private string $name;
    #[ORM\Column(type: 'string', length: 255)]
    private string $description;
    #[ORM\Column(type: 'integer', length: 255)]
    private int $employeeLimit;
    #[ORM\Column(type: 'boolean', length: 255)]
    private bool $status;
    #[ORM\Column(type: 'decimal', length: 10)]
    private ?string $price = null;
    #[ORM\OneToMany(mappedBy: 'plan', targetEntity: company::class)]
    private Collection $company;
    #[ORM\OneToMany(mappedBy: 'plan', targetEntity: subscriptions::class)]
    private Collection $subscriptions;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }
    public function getEmployeeLimit(): ?int
    {
        return $this->employeeLimit;
    }
    public function setEmployeeLimit(int $employeeLimit): void
    {
        $this->employeeLimit = $employeeLimit;
    }
    public function getPrice(): ?string
    {
        return $this->price;
    }
    public function setPrice(string $price): void
    {
        $this->price = $price;
    }
    public function getCompany(): ?Collection
    {
        return $this->company;
    }
    public function setCompany(Collection $company): void
    {
        $this->company = $company;
    }
    public function getSubscriptions(): Collection
    {
        return $this->subscriptions;
    }

    public function addSubscription(subscriptions $subscription): void
    {
        if (!$this->subscriptions->contains($subscription)) {
            $this->subscriptions->add($subscription);
            $subscription->setPlan($this);
        }
    }

    public function removeSubscription(subscriptions $subscription): void
    {
        if ($this->subscriptions->removeElement($subscription)) {
            if ($subscription->getPlan() === $this) {
                $subscription->setPlan($this);
            }
        }
    }
}