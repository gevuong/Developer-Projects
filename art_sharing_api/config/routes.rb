Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  # Each route is an API endpoint, which encapsulates a single controller action your app can take. Creating a resource in this case creates a new user object/instance that can be create/read/update/destroy (CRUD actions).
  #RESTful design patterns
  resources :users, only: [:index, :create, :show, :update, :destroy] do
    # provides a route to get all artworks for a given user
    resources :artworks, only: :index
  end

  resources :artworks, only: [:create, :show, :update, :destroy]
  resources :artwork_shares, only: [:index, :create, :destroy]
  resources :comments, only: [:index, :create, :destroy]

  namespace :api, defaults: { format: :json } do
      resources :fetches, only: [:index]
  end

end
