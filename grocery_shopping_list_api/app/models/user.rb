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

  def query_user_and_category_and_number_purchased
    User.ordered_products.first.product.categories

# SELECT users.id, users.first_name, categories.id AS category_id, categories.name AS category_name, ordered_products.number_purchased FROM users, categories, ordered_products;
   #  id | first_name | category_id | category_name | number_purchased
   # ----+------------+-------------+---------------+------------------
   #  51 | George     |           8 | poultry       |                2
   #  51 | George     |           8 | poultry       |                4
   #  51 | George     |           8 | poultry       |                5
   #  51 | George     |           8 | poultry       |                6
   #  51 | George     |           8 | poultry       |                7
   #  51 | George     |           8 | poultry       |                8
   #  51 | George     |           8 | poultry       |                9
   #  51 | George     |           8 | poultry       |               11
   #  51 | George     |           8 | poultry       |               12
   #  51 | George     |           8 | poultry       |               13
  end
end
