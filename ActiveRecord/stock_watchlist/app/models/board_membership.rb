# == Schema Information
#
# Table name: board_memberships
#
#  id         :integer          not null, primary key
#  member_id  :integer
#  board_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardMembership < ApplicationRecord
  validates :board_id, :member_id, presence: true

  belongs_to :board,
  primary_key: :id,
  foreign_key: :board_id,
  class_name: :Board

  belongs_to :member,
  primary_key: :id,
  foreign_key: :member_id,
  class_name: :Executive

end
