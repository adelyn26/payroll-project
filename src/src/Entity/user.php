<?php

namespace App\Entity;

use App\Repository\userRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: userRepository::class)]
#[ORM\Table(name: 'user')]
class user
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    public ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    public string $name;

    #[ORM\Column(type: 'string', length: 255)]
    public string $email;
    #[ORM\Column(type: 'string', length: 255)]
    public string $phoneNumber;

    #[ORM\Column(type: 'string', length: 255)]
    public string $password;

    #[ORM\Column(type: 'string', length: 255)]
    public string $role;
    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $company = null;

    public function getCompany(): ?Company
    {
        return $this->company;
    }
    public function setCompany(Company $company): void
    {
        $this->company = $company;
    }

}