# == Schema Information
#
# Table name: campervans
#
#  id          :integer          not null, primary key
#  year        :integer          not null
#  make        :string           not null
#  model       :string           not null
#  color       :string           not null
#  mileage     :integer          not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class CampervanTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
