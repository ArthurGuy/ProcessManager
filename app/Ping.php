<?php

namespace App;

use App\Events\PingFailure;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int    id
 * @property array  tags
 * @property string name
 * @property bool   overdue
 * @property bool   error
 * @property Carbon last_ping
 * @property int    frequency_value
 * @property string frequency
 * @property Carbon overdueDate
 */
class Ping extends Model
{
    use SoftDeletes;

    protected $dates = ['last_ping', 'deleted_at'];

    protected $appends = ['ping_url'];

    protected $casts = [
        'active'           => 'boolean',
        'error'            => 'boolean',
        'frequency_value'  => 'integer',
        'created_by'       => 'integer',
        'updated_by'       => 'integer',
    ];


    /**
     * Attributes
     */

    public function getTagsAttribute()
    {
        if (empty($this->attributes['tags'])) {
            return [];
        }
        $tagArray = explode(',', $this->attributes['tags']);

        return $this->trimArrayItems($tagArray);
    }


    public function setTagsAttribute($tags)
    {
        if (is_array($tags)) {
            $this->attributes['tags'] = implode(',', $this->trimArrayItems($tags));
        } else {
            $this->attributes['tags'] = trim($tags);
        }
    }

    public function getLastPingAttribute()
    {
        if ($this->attributes['last_ping'] == '0000-00-00') {
            return null;
        }

        return $this->attributes['last_ping'];
    }

    public function getPingUrlAttribute()
    {
        return route('ping_url', $this->attributes['name']);
    }


    /**
     * The date when the check becaomes overdue
     *
     * @return Carbon
     */
    public function getOverdueDateAttribute()
    {
        if (is_null($this->last_ping)) {
            return new Carbon();
        }

        switch ($this->frequency) {
            case 'minute':
                return (new Carbon($this->last_ping))->addMinutes($this->frequency_value);
            case 'hour':
                return (new Carbon($this->last_ping))->addHours($this->frequency_value);
            case 'day':
                return (new Carbon($this->last_ping))->addDays($this->frequency_value);
            case 'week':
                return (new Carbon($this->last_ping))->addWeeks($this->frequency_value);
            case 'month':
                return (new Carbon($this->last_ping))->addMonths($this->frequency_value);
            case 'year':
                return (new Carbon($this->last_ping))->addYear($this->frequency_value);
        }
    }


    /**
     * This this ping overdue?
     *
     * @return bool
     */
    public function getOverdueAttribute()
    {
        return ($this->overdue_date->lt(new Carbon()));
    }



    /**
     * Scopes
     */

    /**
     * Scope a query to only include active pings.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }


    /**
     * Methods
     */

    /**
     * Locate an existing ping or create a new one
     *
     * @param string $name
     *
     * @return Ping
     */
    public static function findOrNewFromName($name)
    {
        $ping = self::where('name', $name)->first();

        if (!$ping) {
            $ping = self::createDefaultPing($name, true);
        }

        return $ping;
    }

    /**
     * Create a new ping object with the default starting params
     *
     * @param string $name
     * @param bool   $active
     * @param null   $createdBy
     *
     * @return Ping
     */
    public static function createDefaultPing($name, $active, $createdBy = null)
    {
        $ping       = new Ping;
        $ping->name = $name;
        if ($createdBy) {
            $ping->created_by = $createdBy;
        }
        $ping->active          = $active;
        $ping->error           = false;
        $ping->frequency       = 'day';
        $ping->frequency_value = '1';
        $ping->save();

        return $ping;
    }

    /**
     * Set the error state for the ping
     */
    public function setError()
    {
        $broadcastEvent = false;
        if ($this->error == false) {
            $broadcastEvent = true;
        }
        $this->error = true;
        $this->save();

        if ($broadcastEvent) {
            event(new PingFailure($this));
        }
    }

    /**
     * Clear the error state for the ping
     */
    public function clearError()
    {
        $this->error = false;
        $this->save();
    }

    public function recordPingUpdate()
    {
        $this->last_ping = new Carbon();
        $this->error     = false;
        $this->save();
    }


    /**
     * Static
     */


    /**
     * The base url needed to make a ping url
     *
     * @return string
     */
    public static function baseUrl()
    {
        return route('ping_url', '');
    }

    /**
     * Trim each item in the array
     *
     * @param array $tags
     *
     * @return array
     */
    private function trimArrayItems(array $tags)
    {
        return array_map(function ($tag) {
            return trim($tag);
        }, $tags);
    }
}
