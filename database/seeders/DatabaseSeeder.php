<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ─── Users ───────────────────────────────────────────────────────────
        $users = [
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'avatar' => null,
                'last_seen' => now()->subMinutes(5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'avatar' => null,
                'last_seen' => now()->subHours(1),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Charlie Brown',
                'email' => 'charlie@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'avatar' => null,
                'last_seen' => now()->subHours(3),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Diana Prince',
                'email' => 'diana@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'avatar' => null,
                'last_seen' => now()->subDays(1),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Edward Norton',
                'email' => 'edward@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'avatar' => null,
                'last_seen' => now()->subDays(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('users')->insert($users);

        $aliceId = DB::table('users')->where('email', 'alice@example.com')->value('id');
        $bobId = DB::table('users')->where('email', 'bob@example.com')->value('id');
        $charlieId = DB::table('users')->where('email', 'charlie@example.com')->value('id');
        $dianaId = DB::table('users')->where('email', 'diana@example.com')->value('id');
        $edwardId = DB::table('users')->where('email', 'edward@example.com')->value('id');

        // ─── Rooms ───────────────────────────────────────────────────────────
        $room1Id = DB::table('rooms')->insertGetId([
            'name' => null,          // private rooms have no name
            'created_by' => $aliceId,
            'type' => 'private',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $room2Id = DB::table('rooms')->insertGetId([
            'name' => null,
            'created_by' => $bobId,
            'type' => 'private',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $room3Id = DB::table('rooms')->insertGetId([
            'name' => 'Dev Team',
            'created_by' => $aliceId,
            'type' => 'group',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $room4Id = DB::table('rooms')->insertGetId([
            'name' => 'General Chat',
            'created_by' => $charlieId,
            'type' => 'group',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // ─── Room Members (room_user) ─────────────────────────────────────────
        DB::table('room_user')->insert([
            // Room 1: Alice <-> Bob (private)
            ['room_id' => $room1Id, 'user_id' => $aliceId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room1Id, 'user_id' => $bobId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            // Room 2: Bob <-> Charlie (private)
            ['room_id' => $room2Id, 'user_id' => $bobId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room2Id, 'user_id' => $charlieId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            // Room 3: Dev Team (Alice, Bob, Charlie, Diana)
            ['room_id' => $room3Id, 'user_id' => $aliceId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room3Id, 'user_id' => $bobId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room3Id, 'user_id' => $charlieId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room3Id, 'user_id' => $dianaId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            // Room 4: General Chat (all users)
            ['room_id' => $room4Id, 'user_id' => $aliceId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room4Id, 'user_id' => $bobId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room4Id, 'user_id' => $charlieId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room4Id, 'user_id' => $dianaId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['room_id' => $room4Id, 'user_id' => $edwardId, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
        ]);

        // ─── Messages ────────────────────────────────────────────────────────
        // Room 1: Alice <-> Bob
        $msg1 = DB::table('messages')->insertGetId([
            'room_id' => $room1Id,
            'sender_id' => $aliceId,
            'message' => 'Hey Bob! How are you?',
            'type' => 'text',
            'created_at' => now()->subHours(2),
            'updated_at' => now()->subHours(2),
        ]);
        $msg2 = DB::table('messages')->insertGetId([
            'room_id' => $room1Id,
            'sender_id' => $bobId,
            'message' => 'Hey Alice! I\'m doing great, thanks. How about you?',
            'type' => 'text',
            'created_at' => now()->subHours(2)->addMinutes(2),
            'updated_at' => now()->subHours(2)->addMinutes(2),
        ]);
        $msg3 = DB::table('messages')->insertGetId([
            'room_id' => $room1Id,
            'sender_id' => $aliceId,
            'message' => 'Pretty good! Did you finish the pull request?',
            'type' => 'text',
            'created_at' => now()->subHours(1),
            'updated_at' => now()->subHours(1),
        ]);

        // Room 2: Bob <-> Charlie
        $msg4 = DB::table('messages')->insertGetId([
            'room_id' => $room2Id,
            'sender_id' => $bobId,
            'message' => 'Charlie, can you review my code?',
            'type' => 'text',
            'created_at' => now()->subHours(5),
            'updated_at' => now()->subHours(5),
        ]);
        $msg5 = DB::table('messages')->insertGetId([
            'room_id' => $room2Id,
            'sender_id' => $charlieId,
            'message' => 'Sure! Send me the link.',
            'type' => 'text',
            'created_at' => now()->subHours(4),
            'updated_at' => now()->subHours(4),
        ]);

        // Room 3: Dev Team (group)
        $msg6 = DB::table('messages')->insertGetId([
            'room_id' => $room3Id,
            'sender_id' => $aliceId,
            'message' => 'Team, sprint planning starts at 10 AM tomorrow.',
            'type' => 'text',
            'created_at' => now()->subDays(1),
            'updated_at' => now()->subDays(1),
        ]);
        $msg7 = DB::table('messages')->insertGetId([
            'room_id' => $room3Id,
            'sender_id' => $bobId,
            'message' => 'Got it! I\'ll prepare the backlog items.',
            'type' => 'text',
            'created_at' => now()->subDays(1)->addMinutes(5),
            'updated_at' => now()->subDays(1)->addMinutes(5),
        ]);
        $msg8 = DB::table('messages')->insertGetId([
            'room_id' => $room3Id,
            'sender_id' => $charlieId,
            'message' => 'I\'ll join via Zoom. What\'s the link?',
            'type' => 'text',
            'created_at' => now()->subDays(1)->addMinutes(10),
            'updated_at' => now()->subDays(1)->addMinutes(10),
        ]);
        $msg9 = DB::table('messages')->insertGetId([
            'room_id' => $room3Id,
            'sender_id' => $dianaId,
            'message' => 'I\'ll send the Zoom link tonight.',
            'type' => 'text',
            'created_at' => now()->subDays(1)->addMinutes(12),
            'updated_at' => now()->subDays(1)->addMinutes(12),
        ]);

        // Room 4: General Chat (group)
        $msg10 = DB::table('messages')->insertGetId([
            'room_id' => $room4Id,
            'sender_id' => $charlieId,
            'message' => 'Good morning everyone! ☀️',
            'type' => 'text',
            'created_at' => now()->subHours(8),
            'updated_at' => now()->subHours(8),
        ]);
        $msg11 = DB::table('messages')->insertGetId([
            'room_id' => $room4Id,
            'sender_id' => $edwardId,
            'message' => 'Morning! Ready for another productive day?',
            'type' => 'text',
            'created_at' => now()->subHours(8)->addMinutes(3),
            'updated_at' => now()->subHours(8)->addMinutes(3),
        ]);
        $msg12 = DB::table('messages')->insertGetId([
            'room_id' => $room4Id,
            'sender_id' => $aliceId,
            'message' => 'Always! Let\'s crush it today 🚀',
            'type' => 'text',
            'created_at' => now()->subHours(7),
            'updated_at' => now()->subHours(7),
        ]);

        // ─── Message Recipients (message_user) ───────────────────────────────
        // Room 1 messages: recipient = Bob (for Alice's msgs), Alice (for Bob's msgs)
        DB::table('message_user')->insert([
            ['message_id' => $msg1, 'recipient_id' => $bobId, 'status' => 'read', 'read_at' => now()->subHours(2)->addMinutes(1), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg2, 'recipient_id' => $aliceId, 'status' => 'read', 'read_at' => now()->subHours(2)->addMinutes(3), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg3, 'recipient_id' => $bobId, 'status' => 'delivered', 'read_at' => null, 'created_at' => now(), 'updated_at' => now()],

            // Room 2 messages
            ['message_id' => $msg4, 'recipient_id' => $charlieId, 'status' => 'read', 'read_at' => now()->subHours(4)->addMinutes(30), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg5, 'recipient_id' => $bobId, 'status' => 'read', 'read_at' => now()->subHours(3), 'created_at' => now(), 'updated_at' => now()],

            // Room 3 messages (group — each message sent to the other 3 members)
            ['message_id' => $msg6, 'recipient_id' => $bobId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(3), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg6, 'recipient_id' => $charlieId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(8), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg6, 'recipient_id' => $dianaId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(11), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg7, 'recipient_id' => $aliceId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(6), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg7, 'recipient_id' => $charlieId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(9), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg7, 'recipient_id' => $dianaId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(13), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg8, 'recipient_id' => $aliceId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(11), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg8, 'recipient_id' => $bobId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(11), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg8, 'recipient_id' => $dianaId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(13), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg9, 'recipient_id' => $aliceId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(13), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg9, 'recipient_id' => $bobId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(14), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg9, 'recipient_id' => $charlieId, 'status' => 'read', 'read_at' => now()->subDays(1)->addMinutes(14), 'created_at' => now(), 'updated_at' => now()],

            // Room 4 messages (group — 4 other members)
            ['message_id' => $msg10, 'recipient_id' => $aliceId, 'status' => 'read', 'read_at' => now()->subHours(8)->addMinutes(5), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg10, 'recipient_id' => $bobId, 'status' => 'read', 'read_at' => now()->subHours(8)->addMinutes(6), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg10, 'recipient_id' => $dianaId, 'status' => 'delivered', 'read_at' => null, 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg10, 'recipient_id' => $edwardId, 'status' => 'read', 'read_at' => now()->subHours(8)->addMinutes(4), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg11, 'recipient_id' => $aliceId, 'status' => 'read', 'read_at' => now()->subHours(8)->addMinutes(7), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg11, 'recipient_id' => $bobId, 'status' => 'read', 'read_at' => now()->subHours(8)->addMinutes(8), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg11, 'recipient_id' => $charlieId, 'status' => 'read', 'read_at' => now()->subHours(8)->addMinutes(5), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg11, 'recipient_id' => $dianaId, 'status' => 'delivered', 'read_at' => null, 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg12, 'recipient_id' => $bobId, 'status' => 'read', 'read_at' => now()->subHours(7)->addMinutes(2), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg12, 'recipient_id' => $charlieId, 'status' => 'read', 'read_at' => now()->subHours(7)->addMinutes(3), 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg12, 'recipient_id' => $dianaId, 'status' => 'delivered', 'read_at' => null, 'created_at' => now(), 'updated_at' => now()],
            ['message_id' => $msg12, 'recipient_id' => $edwardId, 'status' => 'delivered', 'read_at' => null, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
