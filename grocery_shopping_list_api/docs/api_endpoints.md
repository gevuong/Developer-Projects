# API Endpoints

# JSON API
## Users (Customers)
- `GET /api/users/:user_id/orders`
- `POST /api/users`

## Orders
- `GET /api/users/:user_id/orders`
- `GET /api/orders`

## Products
- `GET /api/products`
- `POST /api/products`
- `GET /api/products/:id`

## OrderedProducts
- `GET /api/ordered_products`
- `POST /api/ordered_products`

## Categories
- `GET /api/categories`

## ProductCategories
- `GET /api/product_categories`


Prefix  Verb   URI Pattern                          Controller#Action
api_user_orders GET    /api/users/:user_id/orders(.:format) api/orders#index {:format=>:json}
api_users GET    /api/users(.:format)                 api/users#index {:format=>:json}
         POST   /api/users(.:format)                 api/users#create {:format=>:json}
api_user DELETE /api/users/:id(.:format)             api/users#destroy {:format=>:json}
api_orders GET    /api/orders(.:format)                api/orders#index {:format=>:json}
         POST   /api/orders(.:format)                api/orders#create {:format=>:json}
api_products GET    /api/products(.:format)              api/products#index {:format=>:json}
         POST   /api/products(.:format)              api/products#create {:format=>:json}
api_product GET    /api/products/:id(.:format)          api/products#show {:format=>:json}
api_ordered_products GET    /api/ordered_products(.:format)      api/ordered_products#index {:format=>:json}
               POST   /api/ordered_products(.:format)      api/ordered_products#create {:format=>:json}
