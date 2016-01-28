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

    /**
     * @test
     */
    public function ping_cant_be_created_via_web_request()
    {
        $this->post('/pings', ['name' => 'test-ping'])
            ->assertResponseStatus(400);
        $this->dontSeeInDatabase('pings', ['name' => 'test-ping']);
    }

    /**
     * @test
     */
    public function ping_can_be_created_via_api()
    {
        $this->json('POST', '/pings', ['name' => 'test-ping-2'], ['Accept' => 'application/json'])
            ->assertResponseStatus(200);
        $this->seeInDatabase('pings', ['name' => 'test-ping-2', 'active' => 1]);
    }

}
