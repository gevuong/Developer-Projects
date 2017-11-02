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

  # Remember, belongs_to is a class method where the first argument is
  # the name of the association instance method, and the second argument is an options
  # hash.
  belongs_to :submitter,
  primary_key: :id,
  foreign_key: :submitter_id,
  class_name: :User

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
end
