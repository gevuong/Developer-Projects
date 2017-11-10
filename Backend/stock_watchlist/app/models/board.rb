# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  company_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Board < ApplicationRecord
  validates :company_id, presence: true

  has_many :memberships,
  primary_key: :id,
  foreign_key: :board_id,
  class_name: :BoardMembership

  belongs_to :company,
  primary_key: :id,
  foreign_key: :company_id,
  class_name: :Company

  has_many :members,
  through: :memberships,
  source: :member

  has_one :exchange,
  through: :company,
  source: :exchange
end
