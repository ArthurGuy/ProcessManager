<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HomepageTest extends TestCase
{
    /**
     * @test
     */
    public function base_url_redirects_to_pings()
    {
        $this->get('/')
            ->assertRedirectedTo('/pings');
    }

    /**
     * @test
     */
    public function pings_url_redirects_to_login()
    {
        $this->get('/pings')
            ->assertRedirectedTo('/login');
    }
}
