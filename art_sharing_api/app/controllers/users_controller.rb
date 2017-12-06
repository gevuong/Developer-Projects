class UsersController < ApplicationController
  # Remember, all controller actions must end in a response back to requestor by either calling render (places content in response body) or redirect_to (sends response that asks requestor to make new request to different URL). Usually, you specify an HTML template when calling render.

  def index
    # if there is no explicit render or redirect, controller renders template with same name as the controller action - in this case, index.html.erb
    # render json: params <-- renders query string params
    if params[:query]
      # finds any value that starts with "#{params[query]}
      # For more info: https://www.w3schools.com/sql/sql_like.asp
      users = User.where('username LIKE ?', "#{params[:query]}%")
    else
      users = User.all
    end
    render json: users
  end

  def create
    # if we don't explicitly render or redirect, Rails is going to render template with the same name: create.html.erb
    # render json: params <-- renders POST request body params

    user = User.new(user_params) # expects all user params to be nested under the key :user in params hash.
    if user.save
      render json: user
    else
      render user.errors.full_messages, status: 422
    end
  end

  def show
    # render json: params # renders route params

    # user = User.find_by(id: params[:id]) same as line below
    render json: User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params) # performs mass-assignment update and save
      render json: user
    else
      render user.errors.full_messages, status: 422
    end
  end

  def destroy
    user = User.find(params[:id])
    if user.destroy
      render json: user # best practice is to render the destroyed object after destroying it in DB.
    else
      render user.errors.full_messages, status: 404
    end
  end

  private
  # Using a private method to encapsulate the permissible parameters (strong parameters) is a good pattern since you'll be able to reuse the same permit list between create and update. These user attributes are keys in nested user hash.

  # use strong params by writing helper method that whitelists User attributes
  def user_params
    params.require(:user).permit(:username, :email)
  end

end
