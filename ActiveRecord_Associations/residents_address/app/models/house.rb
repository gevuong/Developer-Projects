# == Schema Information
#
# Table name: houses
#
#  id         :integer          not null, primary key
#  address    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class House < ApplicationRecord
  validates :address, presence: true

  # association's options hash
  has_many :residents,
  primary_key: :id,
  foreign_key: :house_id,
  class_name: :Person,
  dependent: :destroy
  # child objects ("residents") are destroyed when parent ("house") is destroyed.
end

# Associations tell ActiveRecord that there is a connection between two models. The belongs_to and has_many methods exist in a module named ActiveRecord::Associations::ClassMethods. ActiveRecord::Base extends this module, so the association methods are available as class methods. These class methods define instance methods: in this case, House#people and Person#house. Class methods like this are called macros.

# ActiveRecord needs primary_key and foreign_key attributes to generate proper SQL query.
