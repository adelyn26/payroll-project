<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;

class TenantManager
{
    private RequestStack $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    public function resolve(): ?string
    {
        $request = $this->requestStack->getCurrentRequest();

        if (!$request) {
            return null;
        }

        return $request->headers->get('X-Tenant-Db');
    }

}
