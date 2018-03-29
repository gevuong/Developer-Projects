class SessionsController < ApplicationController

    # verify user credentials to login
    def create 
        user = User.find_by_credentials(
                params[:user][:email],
                params[:user][:password]
            )
        if user
            login(user) 
            redirect_to user_url(user) # redirect to show page
        else
            # cannot render user.errors.full_messages because user = nil
            flash.now[:errors] = ["Incorrect username and/or password"] 
            render :new 
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
