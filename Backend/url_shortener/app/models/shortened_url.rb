# == Schema Information
#
# Table name: shortened_urls
#
#  id           :integer          not null, primary key
#  long_url     :string           not null
#  short_url    :string           not null
#  submitter_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class ShortenedUrl < ApplicationRecord
  validates :long_url, :short_url, :submitter_id, presence: true
  validates :short_url, uniqueness: true

  # Remember, belongs_to is a class method where the first argument is the name of the association instance method, and the second argument is an options hash.
  belongs_to :submitter,
  primary_key: :id,
  foreign_key: :submitter_id,
  class_name: :User

  has_many :visits,
  primary_key: :id,
  foreign_key: :short_url_id,
  class_name: :Visit

  has_many :visitors,
  Proc.new { distinct }, # add magic "scope block" to remove duplicate visitors
  through: :visits,
  source: :visitor


  def self.random_code
    random_code = SecureRandom.urlsafe_base64
    # ActiveRecord method that returns true if a record exists in the table that matches specified condition
    while ShortenedUrl.exists?(short_url: random_code)
      random_code = SecureRandom.urlsafe_base64
    end

    return random_code
  end

  def self.create_short_url!(user, long_url)
    ShortenedUrl.create!(
      submitter_id: user.id,
      long_url: long_url,
      short_url: ShortenedUrl.random_code
    )
  end

  # counts number of clicks on ShortenedUrl
  def num_clicks
    ShortenedUrl.select(:visits)
  end

  # determine number of distinct users who clicked a link
  def num_uniques
    ShortenedUrl.select(:visitors)
  end

  def num_recent_uniques
    num_uniques.where(10.minutes.ago)
  end

end
