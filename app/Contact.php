<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string email
 * @property string name
 * @property array  filter_tags
 * @property bool   active
 */
class Contact extends Model
{
    use SoftDeletes;


    /**
     * Attributes
     */

    public function getFilterTagsAttribute()
    {
        if (empty($this->attributes['filter_tags'])) {
            return [];
        }
        $tagArray = explode(',', $this->attributes['filter_tags']);

        return $this->trimArrayItems($tagArray);
    }


    public function setFilterTagsAttribute($tags)
    {
        if (is_array($tags)) {
            $this->attributes['filter_tags'] = implode(',', $this->trimArrayItems($tags));
        } else {
            $this->attributes['filter_tags'] = trim($tags);
        }
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
