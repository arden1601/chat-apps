# Rooms Seed Data

| id  | name         | created_by (user) | type    |
| --- | ------------ | ----------------- | ------- |
| 1   | _(null)_     | Alice Johnson (1) | private |
| 2   | _(null)_     | Bob Smith (2)     | private |
| 3   | Dev Team     | Alice Johnson (1) | group   |
| 4   | General Chat | Charlie Brown (3) | group   |

## Notes

- **Private** rooms have no `name` (null) — the name is typically derived from the other participant's display name in the UI.
- **Group** rooms have an explicit `name`.
- `created_by` is a foreign key referencing `users.id`.
