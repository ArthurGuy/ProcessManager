<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ping extends Model
{
    use SoftDeletes;

    protected $dates = ['last_ping', 'deleted_at'];

    public function getTagsAttribute()
    {
        if (empty($this->attributes['tags'])) {
            return [];
        }
        $tagArray = explode(',', $this->attributes['tags']);
        return array_map(function($tag) {
            return trim($tag);
        }, $tagArray);
    }


    public function setTagsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['tags'] = implode(',', trim($value));
        } else {
            $this->attributes['tags'] = trim($value);
        }
    }

    public function getLastPingAttribute()
    {
        if ($this->attributes['last_ping'] == '0000-00-00') {
            return null;
        }

        return $this->attributes['last_ping'];
    }
}
