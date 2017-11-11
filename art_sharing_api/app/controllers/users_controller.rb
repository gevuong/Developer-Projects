class UsersController < ApplicationController
  def index
    # if there is no explicit render, controller by default renders a template with same name as the controller action - in this case, index.html.erb
    render plain: "users#index" # text: is deprecated, use plain: 
  end
end
