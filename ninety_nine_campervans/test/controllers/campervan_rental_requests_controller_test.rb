require 'test_helper'

class CampervanRentalRequestsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get campervan_rental_requests_new_url
    assert_response :success
  end

end
