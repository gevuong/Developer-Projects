class Person < ApplicationRecord
  validates :name, :house_id, presence: true
  # rails 5 now automatically validates "belongs_to" associations, we don't need to explicitly add validations ourselves, or there will actually be double errors for the lack of a single association.

  # association's options hash
  belongs_to :house,
  primary_key: :id,
  foreign_key: :house_id,
  class_name: :House
  #optional: true makes "belongs_to" association optional.
end

# A "belongs_to" sets up a connection that will fetch and return a single associated object. Use a belong_to when object has a foreign_key that points to associated record. Because person holds a "house_id" foreign_key, "person" belongs to a "house"

# In Rails 5, "belongs_to" associations are validated for presence by default. You can opt-out of this behavior (ie. allow the association to be null) by adding the key-value pair optional: true
