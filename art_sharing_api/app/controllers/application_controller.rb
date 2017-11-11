class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception # protects against cross-site request forgery (CSRF) by checking authenticity of a certain token for POST requests. By commenting this out, you won't need to include authenticity token in POST params.

  # this is where you'd want to put helper methods to share across all controllers (UsersController < ApplicationController < ActionController::Base)
end
