<?php

namespace App\Doctrine;

use Doctrine\DBAL\Connection;

class DynamicConnection extends Connection
{
    public function switchDatabase(array $params): void
    {
        $this->close();

        parent::__construct(
            $params,
            $this->_driver,
            $this->_config,
            $this->_eventManager
        );

        $this->connect();
    }
}
