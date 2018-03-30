Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:new, :create, :show]

  # session resource is singular, user will only use at most one session, their own.
  resource :session, only: [:new, :create, :destroy]
  resources :artists, only: [:new, :show, :index]
end
