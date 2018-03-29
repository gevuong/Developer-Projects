class UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save 
            render json: user
        else 
            render json: @user.errors.full_messages, status: :unprocessable_entity
        end 
    end

    def new 
        render :new
    end 

    # def show 
    #     render :show
    # end 

    private 

    # helper method encapsulates (or whitelists) permissible, strong parameters (from query string or request body) to protect user attributes from end-user assignment, like adding malicioius fields that are not in form, such as { user: { admin: true } }. 
    # This namespacing of all user_params under :user, a hash-like object, leverages mass-assignment to set all uploaded attributes at once, instead of setting each attribute individually. This is an extremely common Rails pattern.
    # params format: {user: { username: "george", password: "password"} }
    def user_params
        params.require(:user).permit(:email, :password)
    end 
end

