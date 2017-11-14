# == Schema Information
#
# Table name: artworks
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  image_url  :string           not null
#  artist_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Artwork < ApplicationRecord
  validates :title, :image_url, :artist_id, presence: true
  validates :image_url, uniqueness: true # artwork cannot have same URL regardless of who  artist is.
  validates :title, uniqueness: { scope: :artist_id, message: ', artist cannot have two artworks with same title, but two separate artists can have artworks of their own with same title.'}

  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave validation of artist out.
  belongs_to :artist,
  primary_key: :id,
  foreign_key: :artist_id,
  class_name: :User

  has_many :artwork_shares,
  primary_key: :id,
  foreign_key: :artwork_id,
  class_name: :ArtworkShare,
  dependent: :destroy

  # returns set of users with whom artwork is shared with.
  has_many :shared_viewers,
  through: :artwork_shares,
  source: :viewer

  has_many :comments,
  primary_key: :id,
  foreign_key: :artwork_id,
  class_name: :Comment,
  dependent: :destroy

  # return users who liked the artwork using polymorphic association. An instance of Artwork model can retrieve a collection of likes
  has_many :likes, as: :likeable

  # class method that returns all of the artworks made by the user OR shared with the user (1-query method)
  def self.artworks_for_user_id(user_id)
    Artwork
      .left_outer_joins(:artwork_shares)
      .where('(artworks.artist_id = :user_id) OR (artwork_shares.viewer_id = :user_id)', user_id: user_id)
      .distinct
  end
end
