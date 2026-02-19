<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MessageUser extends Model
{
    protected $fillable = ['message_id', 'recipient_id', 'status', 'read_at'];
    protected $table = 'message_user';

    protected $casts = [
        'read_at' => 'datetime',
    ];
}
