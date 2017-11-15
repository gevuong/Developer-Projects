class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception # If commented out, you won't need to include authenticity token in POST params. This protects against cross-site request forgery (CSRF) by checking authenticity of token for POST requests. 

  # this is where you'd want to put helper methods to share across all controllers (UsersController < ApplicationController < ActionController::Base)
end
