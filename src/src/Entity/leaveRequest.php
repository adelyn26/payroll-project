<?php

namespace App\Entity;
use App\Repository\leaveRequestRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: leaveRequestRepository::class)]
#[ORM\Table(name: 'leave_request')]
class leaveRequest
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column(type: 'string', length: 255)]
    private string $leaveType;
    #[ORM\Column(type: 'date', length: 255)]
    private ?\DateTimeInterface $startDate = null;
    #[ORM\Column(type: 'date', length: 255)]
    private ?\DateTimeInterface $endDate = null;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $status = null;
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $reason = null;
    #[ORM\ManyToOne(targetEntity: employee::class, inversedBy: 'leaveRequests')]
    #[ORM\JoinColumn(nullable: false)]
    private Employee $employee;
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getLeaveType(): string
    {
        return $this->leaveType;
    }
    public function setLeaveType(string $leaveType): void
    {
        $this->leaveType = $leaveType;
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
    public function getReason(): ?string
    {
        return $this->reason;
    }
    public function setReason(string $reason): void
    {
        $this->reason = $reason;
    }
    public function getEmployee(): Employee
    {
        return $this->employee;
    }
    public function setEmployee(Employee $employee): void
    {
        $this->employee = $employee;
    }
}