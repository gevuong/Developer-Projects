## customers
| column name     | data type  | details  
|-----------------|------------|------------------------
| id              | integer    | not null, primary key
| username        | string     | not null, indexed, unique  

has_many :orders

## orders
| column name     | data type  | details  
|-----------------|------------|------------------------
| id              | integer    | not null, primary key
| user_id         | integer    | not null, foreign key (references users), indexed

belongs_to: customer
has_many :products

## products
| column name       | data type  | details  
|-------------------|------------|------------------------
| id                | integer    | not null, primary key
| name              | string     | not null, unique
| order_id           | integer    | not null, foreign key (references users), indexed
| category_id           | integer    | not null, foreign key (references users), indexed
|              | string     | not null, indexed
| venue             | string     | not null

belongs_to: order 
has_many: :categories 

## categories
| column name     | data type  | details  
|-----------------|------------|------------------------
| id              | integer    | not null, primary key
| name            | string     | not null, unique

## product_categories (bridge column to connect categories to users)
| column name     | data type  | details  
|-----------------|------------|------------------------
| id              | integer    | not null, primary key
| category_id     | integer    | not null, primary key
| event_id        | integer    | not null, foreign key (references event), indexed
| user_id        | integer    | not null, foreign key (references event), indexed
