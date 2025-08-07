<?php

declare(strict_types=1);

arch('laravel')
    ->preset()->laravel();

arch('security')
    ->preset()->security()->ignoring('md5');