class ApplicationController < ActionController::Base
	# Provides CSRF protection. On any non-GET request, if authenticity token in uploaded form does not match token in session, Rails will raise ActionController::InvalidAuthenticityToken exception. Optionally you can change :exception to :null_session to effectively logout the user.
	protect_from_forgery with: :exception 

	# helper method is now available in views.
	helper_method :current_user 

	# look up user with current session token
	def current_user 
		@current_user = User.find_by_session_token(:session_token)
	end 

	def login(user)
		session[:session_token] = user.session_token
	end 
end
