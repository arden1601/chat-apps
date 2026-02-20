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
        $room = Room::create([
            'type' => 'private',
            'created_by' => $authUser->id,
        ]);
        $room->members()->attach([
            $authUser->id => ['joined_at' => now()],
            $targetUserId => ['joined_at' => now()],
        ]);

        return response()->json(['room_id' => $room->id], 201);
    }

    /**
     * Create a new group room with the given name and members.
     */
    public function storeGroup(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'user_ids' => ['required', 'array', 'min:1'],
            'user_ids.*' => ['exists:users,id'],
        ]);

        $authUser = Auth::user();

        $room = Room::create([
            'type' => 'group',
            'name' => $validated['name'],
            'created_by' => $authUser->id,
        ]);

        // Add creator + selected members, deduplicating in case creator is in the list
        $memberIds = array_unique(array_merge([$authUser->id], $validated['user_ids']));
        $pivotData = collect($memberIds)
            ->mapWithKeys(fn($id) => [$id => ['joined_at' => now()]])
            ->all();
        $room->members()->attach($pivotData);

        return response()->json([
            'id' => $room->id,
            'type' => 'group',
            'name' => $room->name,
        ], 201);
    }
}
