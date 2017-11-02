# == Schema Information
#
# Table name: houses
#
#  id         :integer          not null, primary key
#  address    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class House < ApplicationRecord
  validates :address, presence: true

  # Remember, "has_many" is a class method where the first argument is
  # the name of the association instance method, and the second argument is an options
  # hash.
  has_many :residents,
  primary_key: :id,
  foreign_key: :house_id,
  class_name: :Person,
  dependent: :destroy # child objects ("person") are destroyed when parent ("house") is destroyed.
end
