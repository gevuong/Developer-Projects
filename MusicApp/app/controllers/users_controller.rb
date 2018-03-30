class UsersController < ApplicationController
    # restrict access to certain routes (i.e. #show) if not logged in
    # requires user logout before having access to #new and #create controller actions
    before_action :require_login, except: [:new, :create]
    before_action :require_logout, only: [:new, :create]

    def create
        user = User.new(user_params)
        if user.save
            login(user)
            flash[:notice] = "Successfully created account"
            redirect_to artists_url # artist index page
        else
            # data stored in flash.now is only available in view currently being rendered
            flash.now[:errors] = user.errors.full_messages
            render :new
        end
    end

    # def new
    # end

    def show
        render :show
    end

    private

    # helper method encapsulates (or whitelists) permissible, strong parameters (from query string or request body) to protect user attributes from end-user assignment, like adding malicioius fields that are not in form, such as { user: { admin: true } }.
    # This namespacing of all user_params under :user, a hash-like object, leverages mass-assignment to set all uploaded attributes at once, instead of setting each attribute individually. This is an extremely common Rails pattern.
    # params format: {user: { username: "george", password: "password"} }
    def user_params
        params.require(:user).permit(:email, :password)
    end
end
