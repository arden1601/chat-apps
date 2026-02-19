<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Room;
use function Laravel\Prompts\search;

class RoomService
{
    private function createResponse($user, $room)
    {
        $otherUser = $room->members->first();
        $lastMessage = $room->lastMessage;
        $statusData = [];
        $countUnread = 0;
        // dd($lastMessage);

        $returnLastMessage = [];
        if ($lastMessage) {
            // dd($lastMessage->statusForOthers()->get());
            if ($lastMessage->sender_id == $user->id) {
                // Pengirim: Melihat status pesan dibaca atau belum 
                $statusData = $lastMessage->statusForOthers->map(function ($status) {
                    return [
                        'receiver' => $status->recipient_id,
                        'status' => $status->status,
                        'read_at' => $status->read_at ? $status->read_at->toDateTimeString() : null
                    ];
                });
            } else {
                // Penerima: Melihat jumlah pesan yang belum dibaca
                $countUnread = $room->messages()
                    ->whereHas('statuses', function ($query) use ($user) {
                        $query->where('recipient_id', $user->id)
                            ->where('status', 'delivered');
                    })
                    ->count();
            }
            $returnLastMessage = [
                'id' => $lastMessage->id,
                'type' => $lastMessage->type,
                'message' => $lastMessage->message,
                'created_at' => $lastMessage->created_at->toDateTimeString(),
                'status' => $statusData
            ];
        }
        if ($room->type == 'private') {
            return [
                'id' => $room->id,
                'type' => $room->type,
                'name' => $otherUser->name,
                'avatar' => $otherUser->avatar,
                'lastMessage' => $returnLastMessage,
                'totalUnread' => $countUnread
            ];
        } else if ($room->type == 'group') {
            return [
                'id' => $room->id,
                'type' => $room->type,
                'name' => $room->name,
                'avatar' => '',
                'lastMessage' => $returnLastMessage,
                'totalUnread' => $countUnread
            ];
        }
    }
    public function getRooms(string $search = null)
    {
        $user = Auth::user();
        $query = $user->rooms()
            ->with([
                'members' => function ($query) use ($user) {
                    // hanya ambil user lain (untuk private room)
                    $query->where('user_id', '!=', $user->id);
                }
            ]);
        if ($search) {
            $query->where(function ($q) use ($user, $search) {
                $q->where('type', 'private')
                    ->whereHas('members', function ($memberQuery) use ($user, $search) {
                        $memberQuery->where('user_id', '!=', $user->id)
                            ->where('name', 'like', '%' . $search . '%');
                    })
                    ->orWhere('type', 'group')->where('name', 'like', '%' . $search . '%');
            });
        }
        return $query->get()->map(function ($room) use ($user) {
            return $this->createResponse($user, $room);
        });
    }
}
