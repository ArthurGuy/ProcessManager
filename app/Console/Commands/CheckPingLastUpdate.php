<?php

namespace App\Console\Commands;

use App\Ping;
use Illuminate\Console\Command;

class CheckPingLastUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pings:update-overdue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $results = [];

        $pings = Ping::active()->get();
        foreach ($pings as $ping) {
            /** @var Ping $ping */

            $results[] = [$ping->error, $ping->name, $ping->last_ping, $ping->frequency_value . ' ' . $ping->frequency, $ping->overdueDate, $ping->overdue];

            if ($ping->overdue) {
                $ping->setError();
            } else {
                $ping->clearError();
            }

        }

        $this->table(['error', 'name', 'last_ping', 'frequency' ,'overdue_date', 'overdue'], $results);
    }
}
