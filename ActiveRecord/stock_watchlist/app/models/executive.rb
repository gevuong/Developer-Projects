# == Schema Information
#
# Table name: executives
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Executive < ApplicationRecord

  has_many :memberships,
  primary_key: :id,
  foreign_key: :member_id,
  class_name: :BoardMembership

  has_many :boards,
  through: :memberships,
  source: :board
end
