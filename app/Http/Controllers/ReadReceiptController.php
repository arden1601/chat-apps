<?php

namespace App\Http\Controllers;

use App\Models\MessageUser;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReadReceiptController extends Controller
{
    public function markRead(Room $room)
    {
        $user = Auth::user();

        if (!$room->members()->where('user_id', $user->id)->exists()) {
            abort(403);
        }

        // Mark all delivered messages in this room addressed to the current user as read
        MessageUser::query()
            ->whereHas('message', fn($q) => $q->where('room_id', $room->id))
            ->where('recipient_id', $user->id)
            ->where('status', 'delivered')
            ->update([
                'status' => 'read',
                'read_at' => now(),
            ]);

        return response()->json(['ok' => true]);
    }
}
