<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['room_id', 'sender_id', 'message', 'type'];
    public function statusForOthers()
    {
        return $this->hasMany(MessageUser::class)
            ->where('recipient_id', '!=', auth()->id());
    }

    public function statuses()
    {
        return $this->hasMany(MessageUser::class);
    }
}
