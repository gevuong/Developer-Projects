Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Invokes UsersController#index method when root URL is requested
  # root to: 'users#index'

  # resources :users <-- auto creates 8 routes with following format:
  # HTTP verb 'url path', to: controller#action, as: prefix (aka routing helper methods by appending _url)

  # get 'users', to: 'users#index', as: 'users'
  # post 'users', to: 'users#create', as: 'users'
  # get 'users/new', to: 'users#new', as: 'new_user'
  # get 'users/:id/edit', to: 'users#edit', as: 'edit_user'
  # get 'users/:id', to: 'users#show', as: 'user'
  # patch 'users/:id', to: 'users#update', as: 'user'
  # put 'users/:id', to: 'users#update', as: 'user'
  # delete 'users/:id', to: 'users#destroy', as: 'user'

  # Each route is an API endpoint, which encapsulates a single controller action your app can take. Creating a resource in this case creates a new user object/instance that can be create/read/update/destroy (CRUD actions).
  #RESTful design patterns
  resources :users, only: [:index, :create, :show, :update, :destroy] do
    # provides a route to get all artworks for a given user
    resources :artworks, only: :index
  end

  resources :artworks, only: [:create, :show, :update, :destroy]
  resources :artwork_shares, only: [:index, :create, :destroy]
  resources :comments, only: [:index, :create, :destroy]
end
