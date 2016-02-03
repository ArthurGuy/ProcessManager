<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ContactTest extends TestCase
{
    use WithoutMiddleware;
    use DatabaseTransactions;

    /**
     * @test
     */
    public function contacts_url_returns_200()
    {
        $this->visit('/contacts')
            ->see('<head>')
            ->assertResponseOk();
    }

    /**
     * @test
     */
    public function contacts_url_returns_json()
    {
        $this->get('/contacts', ['Accept' => 'application/json'])
            ->isJson();
    }

    /**
     * @test
     */
    public function contacts_contain_full_record()
    {
        $contact = factory(App\Contact::class)->create();

        $this->get('/contacts', ['Accept' => 'application/json'])
            ->seeJsonEquals([$contact->toArray()]);
    }

    /**
     * @test
     */
    public function contacts_contain_multiple_records()
    {
        $contacts = factory(App\Contact::class, 5)->create();

        $response = $this->get('/contacts', ['Accept' => 'application/json'])
            ->seeJsonContains($contacts[0]->toArray())->response;

        $this->assertEquals(5, count(json_decode($response->content())));
    }

    /**
     * @test
     */
    public function contact_cant_be_created_via_web_request()
    {
        $this->post('/contacts', ['name' => 'John Doe', 'email' => 'john@example.com'])
            ->assertResponseStatus(400);
        $this->dontSeeInDatabase('contacts', ['name' => 'John Doe']);
    }

    /**
     * @test
     */
    public function contact_can_be_created_via_api()
    {
        echo $this->json('POST', '/contacts', ['name' => 'Jane Doe', 'email' => 'jane@example.com', 'filter_tags' => []], ['Accept' => 'application/json'])
            ->assertResponseStatus(200);

        $this->seeInDatabase('contacts', ['name' => 'Jane Doe', 'active' => 1]);
    }


}
