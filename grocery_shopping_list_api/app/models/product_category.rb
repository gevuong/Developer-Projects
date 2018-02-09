# == Schema Information
#
# Table name: product_categories
#
#  id          :integer          not null, primary key
#  product_id  :integer          not null
#  category_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class ProductCategory < ApplicationRecord
  validates :product_id, :category_id, presence: true
  validates :product_id, uniqueness: { scope: :category_id, message: ['a category cannot have the same product'] }
  # how about vice versa
  
  belongs_to :product
  belongs_to :category
end
