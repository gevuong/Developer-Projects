# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  username   :string           not null
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  validates :username, :email, uniqueness: true, presence: true

  has_many :artworks,
  primary_key: :id,
  foreign_key: :artist_id,
  class_name: :Artwork,
  dependent: :destroy

  has_many :artwork_shares,
  primary_key: :id,
  foreign_key: :viewer_id,
  class_name: :ArtworkShare,
  dependent: :destroy

  # returns set of artworks that have been shared with user (not the set of artworks that user has shared with others)
  has_many :shared_artworks,
  through: :artwork_shares,
  source: :artwork

  has_many :comments,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :Comment,
  dependent: :destroy

  has_many :likes,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :Like,
  dependent: :destroy

  # return users liked comments and artworks
  has_many :liked_comments,
  through: :likes,
  source: :likeable,
  source_type: :Comment # need to specify with polymorphic associations

  has_many :liked_artworks,
  through: :likes,
  source: :likeable,
  source_type: :Artwork # need to specify with polymorphic associations

end
