<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index(Room $room)
    {
        $user = Auth::user();

        if (!$room->members()->where('user_id', $user->id)->exists()) {
            abort(403);
        }

        $messages = $room->messages()
            ->with([
                'sender',
                'statuses' => function ($query) use ($user) {
                    $query->where('recipient_id', '!=', $user->id);
                }
            ])
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($message) use ($user) {
                return [
                    'id' => $message->id,
                    'sender_id' => $message->sender_id,
                    'sender_name' => $message->sender->name,
                    'type' => $message->type,
                    'message' => $message->message,
                    'created_at' => $message->created_at->toDateTimeString(),
                    'status' => $message->sender_id === $user->id
                        ? $message->statuses->map(fn($s) => [
                            'receiver' => $s->recipient_id,
                            'status' => $s->status,
                            'read_at' => $s->read_at?->toDateTimeString(),
                        ])
                        : [],
                ];
            });

        return response()->json($messages);
    }

    public function store(Request $request, Room $room)
    {
        $user = Auth::user();

        if (!$room->members()->where('user_id', $user->id)->exists()) {
            abort(403);
        }

        $validated = $request->validate([
            'message' => ['required', 'string', 'max:5000'],
            'type' => ['sometimes', 'in:text,image,video,audio,file'],
        ]);

        $message = $room->messages()->create([
            'sender_id' => $user->id,
            'message' => $validated['message'],
            'type' => $validated['type'] ?? 'text',
        ]);

        // Create a 'delivered' status record for every other room member
        $otherMembers = $room->members()
            ->where('user_id', '!=', $user->id)
            ->pluck('users.id');

        foreach ($otherMembers as $recipientId) {
            $message->statuses()->create([
                'recipient_id' => $recipientId,
                'status' => 'delivered',
            ]);
        }

        broadcast(new MessageSent([
            'id' => $message->id,
            'sender_id' => $message->sender_id,
            'sender_name' => $user->name,
            'type' => $message->type,
            'message' => $message->message,
            'created_at' => $message->created_at->toDateTimeString(),
            'status' => [],
        ], $room->id));

        return response()->json([
            'id' => $message->id,
            'sender_id' => $message->sender_id,
            'sender_name' => $user->name,
            'type' => $message->type,
            'message' => $message->message,
            'created_at' => $message->created_at->toDateTimeString(),
            'status' => [],
        ], 201);
    }
}
