# == Schema Information
#
# Table name: ordered_products
#
#  id               :integer          not null, primary key
#  order_id         :integer          not null
#  product_id       :integer          not null
#  number_purchased :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class OrderedProduct < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of belongs_to or has_many associations
  validates :order_id, :product_id, :number_purchased, presence: true
  validates :number_purchased, numericality: { greater_than: 0 }

  # validate start_must_come_before_end if start_date && end_date
  belongs_to :order
  belongs_to :product


  # def sold_out?
  #   return "product is sold out"
  #
  # end

  # cannot have overlapping start/end dates
  def start_must_come_before_end(start_date, end_date)
    return if start_date < end_date
    errors[:start_date] << "cannot be in the future" unless :start_date < DateTime.now
    errors[:start_date] << "must come before end date"
    errors[:end_date] << "must come after start date"
  end

# An API endpoint that accepts a date range and a day, week, or month and returns a breakdown of products sold by quantity per day/week/month.
  def self.fetch_ordered_products(start_date, end_date, type)
    if type == "day"
      # Step 1: parse date
      date_start = Date.parse(start_date)
      date_end = Date.parse(end_date)

      # Step 2: retrieve ordered_products within parsed date_range
      date_range = (date_start..date_end).to_a

      dates = Hash.new
      date_range.each do |date|
        dates[date] = OrderedProduct.where("date(created_at) = ?", date)
      end


      # remaining_ordered_products = OrderedProduct.where(created_at: (date_start..date_end)).group("date(created_at)")
      #
      #
      # # Step 3: parse date_range by month, week, and day
      #
      # date_range = (date_start..date_end).to_a
      #
      # date_hash = Hash.new
      # date_range.each do |date|
      #   date_hash[date] = OrderedProduct.where("date(created_at) = ?", date)
      # end
      #
      # p date_hash
      #
      # # Step 4: Show quantity sold by month
      # month_range = (date_start.mon..date_end.mon).to_a
      # ods = OrderedProduct.where('created_at = ?', date_start.to_datetime)
      # ods.each do |od|
      #   puts od["created_at"]
      # end

      # Step 5: Iterate through remaining ordered_products and store product_id as key, and number_purchased as hash
      # product_count = Hash.new(0)
      # remaining_ordered_products.each do |ordered_product|
      #   quantity_sold = ordered_product.number_purchased
      #   product_id = ordered_product.product_id
      #   product_count[product_id] += quantity_sold
      # end
      #
      # p product_count
    end
  end
end
