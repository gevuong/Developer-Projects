class Comment < ApplicationRecord
  validates :body, :user_id, :artwork_id, presence: true
  # validates :body, uniqueness: { scope: :user_id }:user_id, :artwork_id, presence: true

  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave validation of author and artwork out
  belongs_to :author,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :artwork,
  primary_key: :id,
  foreign_key: :artwork_id,
  class_name: :Artwork
end
