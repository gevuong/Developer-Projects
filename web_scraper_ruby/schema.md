## track_day events
| column name       | data type  | details  
|-------------------|------------|------------------------
| id                | integer    | not null, primary key
| organizer_id      | integer    | not null, foreign key (references users), indexed
| title             | string     | not null, indexed
| venue             | string     | not null
| location          | string     | not null
| date              | date       | not null, indexed
| description       | text       |
| image_url         | string     | not null
| ticket_price      | integer    | not null, indexed