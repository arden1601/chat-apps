<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    /**
     * Find or create a private room between the authenticated user and a target user.
     */
    public function findOrCreatePrivate(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $authUser = Auth::user();
        $targetUserId = $validated['user_id'];

        // Find an existing private room shared between the two users
        $existingRoom = Room::where('type', 'private')
            ->whereHas('members', fn($q) => $q->where('user_id', $authUser->id))
            ->whereHas('members', fn($q) => $q->where('user_id', $targetUserId))
            ->first();

        if ($existingRoom) {
            return response()->json(['room_id' => $existingRoom->id]);
        }

        // Create a new private room
        $room = Room::create(['type' => 'private']);
        $room->members()->attach([
            $authUser->id => ['joined_at' => now()],
            $targetUserId => ['joined_at' => now()],
        ]);

        return response()->json(['room_id' => $room->id], 201);
    }
}
