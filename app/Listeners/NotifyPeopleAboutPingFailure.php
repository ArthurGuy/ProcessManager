<?php

namespace App\Listeners;

use App\Ping;
use Illuminate\Contracts\Database\ModelIdentifier;
use Mail;
use App\Contact;
use App\Events\PingFailure;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyPeopleAboutPingFailure implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Create the event listener.
     */
    public function __construct()
    {

    }

    /**
     * Handle the event.
     *
     * @param  PingFailure  $event
     * @return void
     */
    public function handle(PingFailure $event)
    {
        $ping = $event->ping;
        if ($ping instanceof ModelIdentifier) {
            $ping = Ping::findOrFail($ping->id);
        }
        /** @var Contact[] $contacts */
        $contacts = Contact::active()->get();

        foreach ($contacts as $contact) {
            if (!empty($contact->filter_tags)) {
                //contact has tags set, check for matches
                if (empty(array_intersect($contact->filter_tags, $ping->tags))) {
                    //no match
                    return;
                }
            }

            //contact the person

            Mail::queue(['text' => 'emails.ping-error'], ['ping' => $ping], function ($message) use($contact, $ping) {
                $message->subject("Nothing heard from ping " . $ping->name);
                $message->to($contact->email, $contact->name);
            });
        }
    }
}
