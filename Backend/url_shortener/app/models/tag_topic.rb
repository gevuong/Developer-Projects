# == Schema Information
#
# Table name: tag_topics
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TagTopic < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  # Remember, "has-many" is a class method, where first arg is association instance method, and 2nd arg is options hash.
  has_many :taggings,
  primary_key: :id,
  foreign_key: :tag_topic_id,
  class_name: :Tagging

  has_many :tagged_urls,
  through: :taggings,
  source: :shortened_url

  # returns 5 most visited links for that tag topic, along with number of times each link has been clicked
  def popular_links
    tagged_urls.joins(:visits)
      .group(:short_url)
      .order('COUNT(visits.id) DESC')
      .select('long_url, short_url, COUNT(visits.id) as number_of_visits')
      .limit(5)

    # links.each { |url| puts "#{url}" }
  end

end
