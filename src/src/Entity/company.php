<?php

namespace App\Entity;

use App\Repository\companyRepository;
use App\Repository\deductionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: companyRepository::class)]
#[ORM\Table(name: 'company')]
class company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private string $name;

    #[ORM\Column(length: 100)]
    private string $rnc;

    #[ORM\Column(length: 100)]
    private string $sector;

    #[ORM\Column(length: 100)]
    private string $address;

    #[ORM\Column(length: 100)]
    private string $phoneNumber;
    #[ORM\Column(length: 100)]
    private string $email;
    #[ORM\Column(length: 100)]
    private string $amountEmployee;
    #[ORM\Column(length: 100)]
    private string $databaseName;
    #[ORM\OneToMany(mappedBy: 'company', targetEntity: user::class, cascade: ['persist', 'remove'])]
    private Collection $users;
    #[ORM\OneToMany(mappedBy: 'company', targetEntity: employee::class, cascade: ['persist', 'remove'])]
    private Collection $employee;
    #[ORM\OneToOne(mappedBy: 'company', targetEntity: subscriptions::class, cascade: ['persist', 'remove'])]
    private ?subscriptions $subscription = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getRnc(): string
    {
        return $this->rnc;
    }

    public function setRnc(string $rnc): void
    {
        $this->rnc = $rnc;
    }

    public function getSector(): string
    {
        return $this->sector;
    }

    public function setSector(string $sector): void
    {
        $this->sector = $sector;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): void
    {
        $this->address = $address;
    }

    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }
    public function getEmail(): string
    {
        return $this->email;
    }
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }
    public function getAmountEmployee(): int
    {
        return $this->amountEmployee;
    }
    public function setAmountEmployee(int $amountEmployee): void
    {
        $this->amountEmployee = $amountEmployee;
    }
    public function getDatabaseName(): string
    {
        return $this->databaseName;
    }
    public function setDatabaseName(string $db): void
    {
        $this->databaseName = $db;
    }
    public function getUser(): Collection
    {
        return $this->users;
    }
    public function setUser(Collection $user): void
    {
     $this->users->add($user);
    }
    public function getEmployee(): Collection
    {
        return $this->employee;
    }
    public function setEmployee(Collection $employee): void
    {
       $this->employee = $employee;
    }
    public function getSubscriptions(): subscriptions
    {
        return $this->subscription;
    }
    public function setSubscriptions(subscriptions $subscriptions): void
    {
        $this->subscription = $subscriptions;
    }
}