class SessionsController < ApplicationController

    # verify user credentials to login user
    def create 
        user = User.find_by_credentials(
                params[:user][:email],
                params[:user][:password]
            )
        if user
            login(user) 
            redirect_to user_url(user) # user show page passing in user.id wildcard
        else 
            render json: "User credentials don't exist"
        end 
    end 

    def new 
        render :new
    end 

    def destroy
        logout 
        redirect_to new_session_url
    end 
end
