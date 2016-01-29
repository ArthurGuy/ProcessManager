<?php

namespace App\Listeners;

use Mail;
use App\Contact;
use App\Events\PingFailure;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyPeopleAboutPingFailure
{
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
        /** @var Contact[] $contacts */
        $contacts = Contact::active()->get();

        foreach ($contacts as $contact) {
            if (!empty($contact->filter_tags)) {
                //contact has tags set, check for matches
                if (empty(array_intersect($contact->filter_tags, $event->ping->tags))) {
                    //no match
                    return;
                }
            }

            //contact the person

            Mail::queue(['text' => 'emails.ping-error'], ['ping' => $event->ping], function($message) use($contact, $event) {
                $message->subject("Nothing heard from ping " . $event->ping->name);
                $message->to($contact->email, $contact->name);
            });
        }
    }
}
