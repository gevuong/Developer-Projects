# == Schema Information
#
# Table name: people
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  house_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Person < ApplicationRecord
  validates :name, :house_id, presence: true

  # Remember, belongs_to is a class method where the first argument is
  # the name of the association instance mthod, and the second argument is an options
  # hash.
  belongs_to :house,
  primary_key: :id,
  foreign_key: :house_id,
  class_name: :House
  # optional: true makes "belongs_to" association optional

end

# Because Rails now automatically validates belongs_to associations, we don't want to explicitly add the validations ourselves, because there will actually be two errors for the lack of a single association.

# A "belongs_to" sets up a connection that will fetch and return a single associated object. Use a belongs_to when object has a foreign_key that points to associated record. Because person holds a "house_id" foreign_key, "person" belongs to a "house"

# In Rails 5, "belongs_to" associations are validated for presence by default. You can opt-out of this behavior (ie. allow the association to be null) by adding the key-value pair optional: true
