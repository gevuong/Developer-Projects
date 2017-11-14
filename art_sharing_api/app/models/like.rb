# == Schema Information
#
# Table name: likes
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  likeable_id   :integer          not null
#  likeable_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#


class Like < ApplicationRecord
  validates :user_id, :likeable_id, :likeable_type, presence: true

  validates :user_id, uniqueness: { scope: [:likeable_id, :likeable_type], message: 'user cannot like same artwork or comment more than once' }

  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the presence validation of
  # likeable and user out here.
  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  # polymorphic associations allows a model to belong to more than one other model, on a single association. You can think of a polymorphic belongs_to declaration as setting up an interface that any other model can use.
  belongs_to :likeable,
  primary_key: :id,
  foreign_key: :likeable_id,
  class_name: :Like,
  polymorphic: true
end
