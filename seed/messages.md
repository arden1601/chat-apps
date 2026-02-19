# Messages Seed Data

| id  | room      | sender        | message                                            | type | sent_at          |
| --- | --------- | ------------- | -------------------------------------------------- | ---- | ---------------- |
| 1   | Room 1    | Alice Johnson | Hey Bob! How are you?                              | text | now() - 2h       |
| 2   | Room 1    | Bob Smith     | Hey Alice! I'm doing great, thanks. How about you? | text | now() - 2h + 2m  |
| 3   | Room 1    | Alice Johnson | Pretty good! Did you finish the pull request?      | text | now() - 1h       |
| 4   | Room 2    | Bob Smith     | Charlie, can you review my code?                   | text | now() - 5h       |
| 5   | Room 2    | Charlie Brown | Sure! Send me the link.                            | text | now() - 4h       |
| 6   | Dev Team  | Alice Johnson | Team, sprint planning starts at 10 AM tomorrow.    | text | now() - 1d       |
| 7   | Dev Team  | Bob Smith     | Got it! I'll prepare the backlog items.            | text | now() - 1d + 5m  |
| 8   | Dev Team  | Charlie Brown | I'll join via Zoom. What's the link?               | text | now() - 1d + 10m |
| 9   | Dev Team  | Diana Prince  | I'll send the Zoom link tonight.                   | text | now() - 1d + 12m |
| 10  | Gen. Chat | Charlie Brown | Good morning everyone! ☀️                          | text | now() - 8h       |
| 11  | Gen. Chat | Edward Norton | Morning! Ready for another productive day?         | text | now() - 8h + 3m  |
| 12  | Gen. Chat | Alice Johnson | Always! Let's crush it today 🚀                    | text | now() - 7h       |

## Notes

- All messages are of type `text`. The enum allows: `text`, `image`, `video`, `audio`, `file`.
- `sender_id` in the DB references `users.id`.
- `room_id` references `rooms.id`.
