# Room–User (Members) Seed Data

The `room_user` table stores which users belong to each room.

| room_id | room name    | user_id | user          | joined_at |
| ------- | ------------ | ------- | ------------- | --------- |
| 1       | _(private)_  | 1       | Alice Johnson | now()     |
| 1       | _(private)_  | 2       | Bob Smith     | now()     |
| 2       | _(private)_  | 2       | Bob Smith     | now()     |
| 2       | _(private)_  | 3       | Charlie Brown | now()     |
| 3       | Dev Team     | 1       | Alice Johnson | now()     |
| 3       | Dev Team     | 2       | Bob Smith     | now()     |
| 3       | Dev Team     | 3       | Charlie Brown | now()     |
| 3       | Dev Team     | 4       | Diana Prince  | now()     |
| 4       | General Chat | 1       | Alice Johnson | now()     |
| 4       | General Chat | 2       | Bob Smith     | now()     |
| 4       | General Chat | 3       | Charlie Brown | now()     |
| 4       | General Chat | 4       | Diana Prince  | now()     |
| 4       | General Chat | 5       | Edward Norton | now()     |

## Summary

| Room         | Type    | Members                            |
| ------------ | ------- | ---------------------------------- |
| Room 1       | Private | Alice ↔ Bob                        |
| Room 2       | Private | Bob ↔ Charlie                      |
| Dev Team     | Group   | Alice, Bob, Charlie, Diana         |
| General Chat | Group   | Alice, Bob, Charlie, Diana, Edward |
