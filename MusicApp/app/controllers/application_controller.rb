class ApplicationController < ActionController::Base
	# Provides CSRF protection. Any form that does not upload form_authenticity_token will cause Rails to throw error because it won't know if non-GET request is coming from "cross-site". If authenticity token in uploaded form does not match token in session, Rails will raise exception. Optionally you can change :exception to :null_session to effectively logout the user.
	protect_from_forgery with: :exception 

	# enables helper methods to be used in views.
	helper_method :current_user 

	# look up user with current session token
	def current_user 
		return nil if session[:session_token].nil? 
		@current_user = User.find_by_session_token(session[:session_token])
		@current_user.reset_session_token! if @current_user
	end 

	def login(user)
		@current_user = user
		session[:session_token] = user.session_token
	end 

	def logout
		@current_user.reset_session_token!
		session[:session_token] = nil
	end 
end
