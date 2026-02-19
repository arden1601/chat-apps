<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\RoomService;

class DashboardController extends Controller
{
    public function index(RoomService $roomService, Request $request): Response
    {
        $search = $request->query('search');
        $data = [
            'rooms' => [],
            'contacts' => []
        ];

        if ($search) {
            $contacts = $roomService->getContacts($search);
            $rooms = $roomService->getRooms($search);

            $roomUserIds = collect($rooms)
                ->where('type', 'private')
                ->pluck('user_id')->all();

            $contacts = $contacts
                ->reject(function ($contacts) use ($roomUserIds) {
                    return in_array($contacts['user_id'], $roomUserIds);
                });

            $data['rooms'] = $rooms;
            $data['contacts'] = $contacts;
        } else {
            $rooms = $roomService->getRooms();
            $data['rooms'] = $rooms;
        }
        return Inertia::render('Index', [
            'data' => $data,
            'search' => $search
        ]);
    }
}
