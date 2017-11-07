class Tagging < ApplicationRecord
  validates :tag_topic_id, :shortened_url_id, presence: true
  validates :shortened_url_id, uniqueness: true

  # Remember, "belong_to" is a class method where the first arg is name of association instance method, and second arg is an options hash
  belongs_to :tag_topic,
  primary_key: :id,
  foreign_key: :tag_topic_id,
  class_name: :TagTopic

  belongs_to :shortened_url,
  primary_key: :id,
  foreign_key: :shortened_url_id,
  class_name: :ShortenedUrl

end
