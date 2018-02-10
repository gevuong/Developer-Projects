class Api::UsersController < ApplicationController
  def create
    # ivar not necesssary for controller to work with models or interact with DB
    user = User.new(user_params)
    p params
    if user.save
      render json: user, status: 201 # created
    else
      render user.errors.full_messages, status: 422 # unprocessable entity
    end
  end

  def index
    render json: User.all
  end

  def destroy
    user = User.find(params[:id])
    if user
      user.destroy
      render json: user # best practice is to render destroyed object
    else
      render user.errors.full_messages, status: 404 # not found
    end
  end

  private

  # use strong params by writing helper method that whitelists User attributes. All user_params are nested under the key :user in params hash.
  def user_params
    params.require(:user).permit(:first_name)
  end
end

# Use private method to encapsulate permissible parameters (strong parameters) is a good pattern to get accustomed to since you'll be able to reuse the same permit list (i.e. user_params) between create and update. These user attributes are keys in a nested user hash.

# This namespacing of all user_params under :user leverages mass-assignment to set all the uploaded attributes at once, which is an extremely common Rails pattern. Almost every time we upload parameters, nest them under an inner hash to use for mass assignment.
