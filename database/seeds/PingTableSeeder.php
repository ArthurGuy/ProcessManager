<?php

use Illuminate\Database\Seeder;

class PingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Ping::class, 20)->create();
    }
}
