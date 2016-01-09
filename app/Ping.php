<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ping extends Model
{
    use SoftDeletes;

    protected $dates = ['last_ping', 'deleted_at'];

    protected $appends = ['ping_url'];

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
        return array_map(function($tag) {
            return trim($tag);
        }, $tags);
    }
}
