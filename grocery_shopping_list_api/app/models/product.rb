# == Schema Information
#
# Table name: products
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  price      :decimal(, )      not null
#  quantity   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Product < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of belongs_to or has_many associations
  validates :name, :price, :quantity, presence: true
  validates :name, uniqueness: true
  validates :quantity, numericality: { greater_than: 0 }

  has_many :ordered_products,
  dependent: :destroy

  has_many :orders,
  through: :ordered_products,
  source: :order

end
