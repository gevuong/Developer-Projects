# == Schema Information
#
# Table name: orders
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  status     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Order < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of belongs_to or has_many associations

  # freeze renders constants immutable
  STATUS_STATES = ["WAITING FOR DELIVERY", "ON ITS WAY", "DELIVERED"].freeze

  validates :user_id, presence: true
  validates :status, inclusion: STATUS_STATES

  has_many :ordered_products,
  dependent: :destroy

  has_many :products,
  through: :ordered_products,
  source: :product

  after_initialize :assign_delivery_status

  def assign_delivery_status
      self.status ||= "WAITING FOR DELIVERY"
  end

  # class method that returns all orders the user made
  def self.orders_for_user_id(user_id)
    Order.where(user_id: user_id)
  end

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |order|
        csv << order.attributes.values_at(*column_names)
      end 
    end
  end
end
