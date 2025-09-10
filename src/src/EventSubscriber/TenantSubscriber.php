<?php

namespace App\EventSubscriber;

use App\Doctrine\DynamicConnection;
use App\Service\TenantManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class TenantSubscriber implements EventSubscriberInterface
{
    private TenantManager $tenantManager;
    private EntityManagerInterface $em;

    public function __construct(TenantManager $tenantManager, EntityManagerInterface $em)
    {
        $this->tenantManager = $tenantManager;
        $this->em = $em;
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $tenantDb = $this->tenantManager->resolve();

        if ($tenantDb && $this->em->getConnection() instanceof DynamicConnection) {
            /** @var DynamicConnection $conn */
            $conn = $this->em->getConnection();

            $params = $conn->getParams();
            $params['dbname'] = $tenantDb;

            $conn->switchDatabase($params);
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
        ];
    }
}
