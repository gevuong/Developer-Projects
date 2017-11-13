# == Schema Information
#
# Table name: artwork_shares
#
#  id         :integer          not null, primary key
#  artwork_id :integer          not null
#  viewer_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ArtworkShare < ApplicationRecord
  validates :artwork_id, :viewer_id, presence: true
  validates :artwork_id, uniqueness: { scope: :viewer_id, message: 'cannot be shared with viewer more than once'}

  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave validation of artist out.

  # belongs_to :artwork <-- shorthand for the following:
  belongs_to :artwork,
  primary_key: :id,
  foreign_key: :artwork_id,
  class_name: :Artwork

  # belongs_to :viewer, class_name: :User <-- shorthand for the following:
  belongs_to :viewer,
  primary_key: :id,
  foreign_key: :viewer_id,
  class_name: :User

end
