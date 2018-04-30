# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of belongs_to or has_many associations
  validates :first_name, presence: true, uniqueness: true, length: { in: 2..20 }, format: { with: /\A[a-zA-Z]+\z/, message: "can only be letters" }

  has_many :orders,
  dependent: :destroy

  has_many :ordered_products,
  through: :orders,
  source: :ordered_products

  # incomplete
  def query_user_and_category_and_number_purchased
    User.ordered_products.first.product.categories

  end
end
