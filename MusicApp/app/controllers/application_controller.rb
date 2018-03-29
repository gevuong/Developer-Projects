class ApplicationController < ActionController::Base
	# Provides CSRF protection. Any form that does not upload form_authenticity_token will cause Rails to throw error because it won't know if non-GET request is coming from "cross-site". If authenticity token in uploaded form does not match token in session, Rails will raise exception. Optionally you can change :exception to :null_session to effectively logout the user.
	protect_from_forgery with: :exception 

	# enables helper methods to be available in views
	helper_method :current_user, :logged_in? 

	# look up user with current session token
	def current_user 
		@current_user ||= User.find_by_session_token(session[:session_token])
	end 

	# upon login, reset user's session and assign to session cookie
	def login(user)
		@current_user = user
		session[:session_token] = user.reset_session_token!
	end 

	# return boolean indicating whether someone is logged in
	def logged_in?
		!!current_user
	end 

	def logout
		current_user.reset_session_token!
		session[:session_token] = nil
	end 

	def require_login
		redirect_to new_session_url if !current_user
	end 
end
