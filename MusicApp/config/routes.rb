Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:create]

  # session resource is singular because user will only use at most one session, their own.
  resource :session, only: [:new, :create, :destroy]
end
