Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Each route is an API endpoint, which encapsulates a single controller action your app can take. Creating a resource in this case creates a new user object/instance that can create/read/update/destroy (CRUD actions).

  #RESTful design patterns, set default format of resources to :json.
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :destroy] do
      resources :orders, only: %i(index) # %i or %I creates an array of symbols
    end

    resources :orders, only: [:create, :index]
    resources :products, only: [:create, :index, :show]
    resources :ordered_products, only: [:create, :index]
  end
end
