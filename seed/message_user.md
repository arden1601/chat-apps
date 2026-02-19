# Message–User (Read Receipts) Seed Data

The `message_user` table tracks delivery/read status per recipient for each message.

| message_id | msg preview                         | recipient     | status    | read_at          |
| ---------- | ----------------------------------- | ------------- | --------- | ---------------- |
| 1          | Hey Bob! How are you?               | Bob Smith     | read      | now() - 2h + 1m  |
| 2          | Hey Alice! I'm doing great...       | Alice Johnson | read      | now() - 2h + 3m  |
| 3          | Pretty good! Did you finish...      | Bob Smith     | delivered | null             |
| 4          | Charlie, can you review my code?    | Charlie Brown | read      | now() - 4h + 30m |
| 5          | Sure! Send me the link.             | Bob Smith     | read      | now() - 3h       |
| 6          | Team, sprint planning...            | Bob Smith     | read      | now() - 1d + 3m  |
| 6          | Team, sprint planning...            | Charlie Brown | read      | now() - 1d + 8m  |
| 6          | Team, sprint planning...            | Diana Prince  | read      | now() - 1d + 11m |
| 7          | Got it! I'll prepare the backlog... | Alice Johnson | read      | now() - 1d + 6m  |
| 7          | Got it! I'll prepare the backlog... | Charlie Brown | read      | now() - 1d + 9m  |
| 7          | Got it! I'll prepare the backlog... | Diana Prince  | read      | now() - 1d + 13m |
| 8          | I'll join via Zoom...               | Alice Johnson | read      | now() - 1d + 11m |
| 8          | I'll join via Zoom...               | Bob Smith     | read      | now() - 1d + 11m |
| 8          | I'll join via Zoom...               | Diana Prince  | read      | now() - 1d + 13m |
| 9          | I'll send the Zoom link tonight.    | Alice Johnson | read      | now() - 1d + 13m |
| 9          | I'll send the Zoom link tonight.    | Bob Smith     | read      | now() - 1d + 14m |
| 9          | I'll send the Zoom link tonight.    | Charlie Brown | read      | now() - 1d + 14m |
| 10         | Good morning everyone! ☀️           | Alice Johnson | read      | now() - 8h + 5m  |
| 10         | Good morning everyone! ☀️           | Bob Smith     | read      | now() - 8h + 6m  |
| 10         | Good morning everyone! ☀️           | Diana Prince  | delivered | null             |
| 10         | Good morning everyone! ☀️           | Edward Norton | read      | now() - 8h + 4m  |
| 11         | Morning! Ready for another...       | Alice Johnson | read      | now() - 8h + 7m  |
| 11         | Morning! Ready for another...       | Bob Smith     | read      | now() - 8h + 8m  |
| 11         | Morning! Ready for another...       | Charlie Brown | read      | now() - 8h + 5m  |
| 11         | Morning! Ready for another...       | Diana Prince  | delivered | null             |
| 12         | Always! Let's crush it today 🚀     | Bob Smith     | read      | now() - 7h + 2m  |
| 12         | Always! Let's crush it today 🚀     | Charlie Brown | read      | now() - 7h + 3m  |
| 12         | Always! Let's crush it today 🚀     | Diana Prince  | delivered | null             |
| 12         | Always! Let's crush it today 🚀     | Edward Norton | delivered | null             |

## Notes

- `message_id` references `messages.id`.
- `recipient_id` references `users.id` — it is never the sender themselves.
- `status` enum: `delivered` (default) or `read`.
- `read_at` is `null` for unread/delivered messages.
