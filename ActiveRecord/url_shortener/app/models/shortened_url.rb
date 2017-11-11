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
  validate :no_spamming # "validate" declaration is used for custom validation, whereas "validates" is used for generic validation like presence, uniqueness, etc.

  # Remember, belongs_to is a class method where the first argument is the name of the association instance method, and the second argument is an options hash.
  belongs_to :submitter,
  primary_key: :id,
  foreign_key: :submitter_id,
  class_name: :User

  has_many :visits,
  primary_key: :id,
  foreign_key: :short_url_id,
  class_name: :Visit,
  dependent: :destroy

  has_many :visitors,
  Proc.new { distinct }, # add magic "scope block" to remove duplicate visitors
  through: :visits,
  source: :visitor

  has_many :taggings,
  primary_key: :id,
  foreign_key: :shortened_url_id,
  class_name: :Tagging,
  dependent: :destroy

  has_many :tag_topics,
  through: :taggings,
  source: :tag_topic


  def self.random_code
    random_code = SecureRandom.urlsafe_base64
    # ActiveRecord exist? method returns true if record exists in the table that matches specified condition
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

  # counts number of clicks on ShortenedUrl.
  # invoked on a ShortenedUrl object, thus executing association #visits instance method to obtain collection of visitor_ids
  def num_clicks
    visits.count
  end

  # determine number of distinct users who clicked link
  def num_uniques
    visits
      .select(:visitor_id)
      .distinct
      .count
  end

  # collect unique clicks within recent time period
  def num_recent_uniques
    visits
      .select(:visitor_id)
      .where('created_at > ?', 60.minutes.ago)
      .distinct
      .count
  end

  private

  # Custom validation methods
  # prevent users from submitting more than 5 URLs in less than a minute
  def no_spamming
    submit_count = ShortenedUrl
      .where('created_at >= ?', 1.minute.ago)
      .where(submitter_id: submitter_id)
      .length

    errors[:maximum] << 'of five short URLs per minute' if submit_count >= 5
    # submit_count = submitter
    #   .select(:submitter_id)
    #   .where('created_at > ?', 1.minute.ago)
    #   .count
    #
    # raise 'Cannot submit more than 5 URLs in under a minute' if submit_count > 5
  end

  # limit non-premium users to 5 total URL submissions
  # def nonpremium_max
  #   submit_count = submitter.select(:submitter_id)
  #     .count

    # if submitter.premium == false && submit_count >= 5
    #   raise 'non-premium users cannot submit more than 5 total URLs'
    # end
  # end

end
