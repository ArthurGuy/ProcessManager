<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PingsTest extends TestCase
{
    use WithoutMiddleware;
    use DatabaseTransactions;

    /**
     * @test
     */
    public function pings_url_returns_200()
    {
        $this->visit('/pings')
            ->see('<head>')
            ->assertResponseOk();
    }

    /**
     * @test
     */
    public function pings_url_returns_json()
    {
        $this->get('/pings', ['Accept' => 'application/json'])
            ->isJson();
    }

    /**
     * @test
     */
    public function pings_contain_full_record()
    {
        $ping1 = factory(App\Ping::class)->create();

        $this->get('/pings', ['Accept' => 'application/json'])
            ->seeJsonEquals([$ping1->toArray()]);
    }

    /**
     * @test
     */
    public function pings_contain_multiple_records()
    {
        $pings = factory(App\Ping::class, 20)->create();

        $response = $this->get('/pings', ['Accept' => 'application/json'])
            ->seeJsonContains($pings[0]->toArray())->response;

        $this->assertEquals(20, count(json_decode($response->content())));
    }

}
