Rails.application.routes.draw do
  get 'campervan_rental_requests/new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :campervans, only: [:index, :show, :new, :create, :edit, :update]

  resources :campervan_rental_requests, only: [:new, :create] do
    member do # add two member routes to campervan_rental_request
      get 'approve'
      get 'deny'
    end
  end

end
