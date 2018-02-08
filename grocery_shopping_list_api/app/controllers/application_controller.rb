class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  # Commenting out turns off cross-site request forgery (CSRF) by checking authenticity of token for POST requests. You won't need to include authenticity token in POST params.

  helper_method :merge_arrays

  def merge_arrays(arr1, arr2)

  end
end


# For more info on how to pass helper methods to template views https://stackoverflow.com/questions/35342291/how-to-access-a-controller-method-from-a-jbuilder-template
