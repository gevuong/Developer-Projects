class UsersController < ApplicationController
  # Remember, all controller actions must end in a response back to requestor by either calling render (places content in response body) or redirect_to (sends response that asks requestor to make new request to different URL). Usually, you specify an HTML template when calling render.

  def index
    # if there is no explicit render or redirect, controller renders template with same name as the controller action - in this case, index.html.erb
    # render json: params # query string params

    users = User.all
    render json: users
  end

  def create
    # if we don't explicitly render or redirect, Rails is going to render template with the same name: create.html.erb
    render json: params # POST request body params
  end

  def show
    render json: params # route params
  end
end
