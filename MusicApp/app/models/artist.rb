# == Schema Information
#
# Table name: artists
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Artist < ApplicationRecord
    # name does not have to be unique
    validates :name, presence: true, length: { in: 2..20 }, format: { with: /[a-zA-Z0-9]/, message: "can only be letters and numbers" }

end
