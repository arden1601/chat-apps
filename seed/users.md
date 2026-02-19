# Users Seed Data

All passwords are hashed with **bcrypt** via `Hash::make()`. The plain-text value for every account is the same: `password123`.

| id  | name          | email               | password (plain) | avatar | last_seen         | email_verified_at |
| --- | ------------- | ------------------- | ---------------- | ------ | ----------------- | ----------------- |
| 1   | Alice Johnson | alice@example.com   | password123      | null   | now() - 5 minutes | now()             |
| 2   | Bob Smith     | bob@example.com     | password123      | null   | now() - 1 hour    | now()             |
| 3   | Charlie Brown | charlie@example.com | password123      | null   | now() - 3 hours   | now()             |
| 4   | Diana Prince  | diana@example.com   | password123      | null   | now() - 1 day     | now()             |
| 5   | Edward Norton | edward@example.com  | password123      | null   | now() - 2 days    | now()             |

## Notes

- `avatar` is `null` for all seeded users; avatars can be set later through the profile settings.
- `last_seen` is set relative to the time the seeder runs so the data feels "live".
- All accounts are immediately verified (`email_verified_at` is not null).
