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
    errors[:start_date] << "cannot be in the future" unless :start_date <= DateTime.now
    errors[:end_date] << "cannot be in the future" unless :end_date <= DateTime.now

    errors[:start_date] << "is not a valid date" if start_date.valid_date?
    errors[:end_date] << "is not a valid date" if end_date.valid_date?

    errors[:start_date] << "must come before end date"
    errors[:end_date] << "must come after start date"
  end


  def day_week_month?(type)
    type
  end

# An API endpoint that accepts a date range and a day, week, or month and returns a breakdown of products sold by quantity per day/week/month.
  def self.fetch_ordered_products(start_date, end_date, type)
    if type == "day"
      # Step 1: parse date
      date_start = Date.parse(start_date)
      date_end = Date.parse(end_date)

      # Step 2: retrieve ordered_products within parsed date_range
      # remaining_ordered_products = OrderedProduct.where('ordered_products.created_at BETWEEN ? AND ?', date_start, date_end)
      date_range = (date_start..date_end).to_a

      dates = Hash.new
      date_range.each do |date|
        dates[date] = OrderedProduct.includes(:product).where("date(created_at) = ?", date)
      end
      dates

    elsif type == "month" # need to keep track of year as well.
      date_start = Date.parse(start_date).beginning_of_month
      date_end = Date.parse(end_date).end_of_month


      # OrderedProduct.where("extract(month from created_at) = ? AND extract(year from created_at) = ?", 12, 2017)


      OrderedProduct.where(:created_at => (date_start..date_end)).order(:created_at).group_by { |m| m.created_at.month.to_s + "-" + m.created_at.year.to_s }


      # try this: How to deal with different years with same month
      # OrderedProduct.group("year(created_at)").group("month(created_at)")
      # OrderedProduct.where(:created_at => (date_start..date_end)).group("date(created_at)")
      # OrderedProduct.pluck("date(created_at)").group("date(created_at)")
      #
      # example_range = (Time.zone.today..2.months.from_now)
      # example_range.group_by { |date| date.month.to_s + "-" + date.year.to_s }

    end
  end
end
