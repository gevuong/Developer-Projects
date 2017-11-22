# == Schema Information
#
# Table name: campervan_rental_requests
#
#  id           :integer          not null, primary key
#  start_date   :date             not null
#  end_date     :date             not null
#  campervan_id :integer          not null
#  status       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class CampervanRentalRequestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
