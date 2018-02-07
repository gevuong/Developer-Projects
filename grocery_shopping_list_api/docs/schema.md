## users
| column name     | data type  | details  
|-----------------|------------|------------------------
| id              | integer    | not null, primary key
| name            | string     | not null, unique  

has_many :orders 
has_many :ordered_products,
through: :orders,
source: :products

## orders
| column name     | data type  | details  
|-----------------|------------|------------------------
| id              | integer    | not null, primary key
| customer_id     | integer    | not null, foreign key (references users), indexed
| product_id      | integer    | not null, foreign key (references users), indexed

belongs_to :customer
belongs_to :products

## products
| column name       | data type  | details  
|-------------------|------------|------------------------
| id                | integer    | not null, primary key
| name              | string     | not null, unique
| quantity          | integer    | not null
| order_id          | integer    | not null, foreign key (references users), indexed

has_many :orders 
has_many :product_categories
has_many :categories 
through: :product_categories
source: category

## categories
| column name     | data type  | details  
|-----------------|------------|------------------------
| id              | integer    | not null, primary key
| name            | string     | not null, unique

has_many :product_categories 
has_many :products
through: :product_categories 
source: :product

## product_categories (joins table to connect has many relationship between categories and products)
| column name     | data type  | details  
|-----------------|------------|------------------------
| id              | integer    | not null, primary key
| category_id     | integer    | not null, foreign key (references event), indexed
| product_id      | integer    | not null, foreign key (references event), indexed

belongs_to :category
belongs_to :product 
