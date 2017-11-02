# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true

  # Remember, "has_many" is a class method where the first argument is the name of the association instance method, and the second argument is an options hash.
  has_many :submitted_urls,
  primary_key: :id,
  foreign_key: :submitter_id,
  class_name: :ShortenedUrl

  has_many :visits,
  primary_key: :id,
  foreign_key: :visitor_id,
  class_name: :Visit

  has_many :visited_urls,
  Proc.new { distinct }, # add magic "scope block" to remove duplicate visitors
  through: :visits,
  source: :visited_short_url

end
