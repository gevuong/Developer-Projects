# == Schema Information
#
# Table name: polls
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Poll < ApplicationRecord
  validates :author_id, :title, presence: true
  # N.B. Remember, Rails 5 automatically validates presence of 'belongs_to' associations, so we can leave out validation of :author

  # Remember, "belongs_to" is a class method where first argument is name of association instance method, and second argument is an options hash.
  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :User

  # Remember, "has_many" is a class method where first arg is name of association instance method, and second arg is an options hash.
  has_many :questions,
  primary_key: :id,
  foreign_key: :poll_id,
  class_name: :Question,
  dependent: :destroy

end
