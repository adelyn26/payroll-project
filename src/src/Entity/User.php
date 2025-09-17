<?php

namespace App\Entity;

use App\Repository\userRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: userRepository::class)]
#[ORM\Table(name: 'user')]
class User
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
    #[ORM\Column(type:"boolean")]
    private bool $isVerified = false;
    #[ORM\Column(type:"string", length:64, nullable:true)]
    private ?string $verificationCode = null;
    #[ORM\Column(type:"datetime", nullable:true)]
    private ?\DateTimeInterface $verificationCodeExpiresAt = null;
    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    private ?company $company = null;

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
    public function getEmail(): ?string
    {
        return $this->email;
    }
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }
    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }
    public function setPhoneNumber(string $phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }
    public function getPassword(): ?string
    {
        return $this->password;
    }
    public function setPassword(string $password): void
    {
        $this->password = $password;
    }
    public function getRole(): ?string
    {
        return $this->role;
    }
    public function setRole(string $role): void
    {
        $this->role = $role;
    }
    public function getCompany(): ?company
    {
        return $this->company;
    }
    public function setCompany(company $company): void
    {
        $this->company = $company;
    }

    /**
     * @return bool
     */
    public function isVerified(): bool
    {
        return $this->isVerified;
    }
    public function setIsVerified(bool $isVerified): void
    {
        $this->isVerified = $isVerified;
    }
    public function getVerificationCode(): ?string
    {
        return $this->verificationCode;
    }
    public function setVerificationCode(string $verificationCode): void
    {
        $this->verificationCode = $verificationCode;
    }
    public function getVerificationCodeExpiresAt(): ?\DateTimeInterface
    {
        return $this->verificationCodeExpiresAt;
    }
    public function setVerificationCodeExpiresAt(\DateTimeInterface $verificationCodeExpiresAt): void
    {
        $this->verificationCodeExpiresAt = $verificationCodeExpiresAt;
    }

}