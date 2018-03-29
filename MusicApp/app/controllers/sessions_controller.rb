class SessionsController < ApplicationController

    # verify user credentials to login user
    def create 
        @user = User.find_by_credentials(
                params[:user][:email],
                params[:user][:password]
            )
        
        if @user
            # login(@user) 
            render json: "Welcome back #{@user.email}"
        else 
            render json: "User credentials don't exist"
        end 
    end 

    def new 
        render :new
    end 

    # DELETE request to logout
    def destroy
        user = current_user
        if user 
            # logout
            # render json: 
        else 
            # render user.errors.full_messages, status: 404 # not found 
        end 
    end 
end
