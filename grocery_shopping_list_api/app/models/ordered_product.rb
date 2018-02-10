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


# An API endpoint that accepts a date range and a day, week, or month and returns a breakdown of products sold by quantity per day/week/month.
  def self.fetch_ordered_products(start_date, end_date, type)
    date_start = Date.parse(start_date)
    date_end = Date.parse(end_date)

    # look into :find_each or :find_in_batches
    if type == "day"
      date_range = (date_start..date_end).to_a

     # NB try making one query to grab all ordered_products within date range, then iterate through date range and see if it equals then store ordered_product within date.
      # iterate through dates in the views? So I don't have to make a query for each date.
      dates = Hash.new
      date_range.each do |date|
        dates[date] = OrderedProduct.includes(:product)
          .where("date(created_at) = ?", date)
      end
      dates

    elsif type == "week"
      # date_trunc truncates date down to a certain precision
      OrderedProduct.group("date_trunc('week', created_at), ordered_products.id")
      # OrderedProduct.includes(:product)
      #   .where(:created_at => (date_start..date_end))
      #   .order(:created_at)
      #   .group_by { |date| date.created_at.to_date.cweek.to_s + "-" + date.created_at.year.to_s }

    elsif type == "month" # need to keep track of year as well.
      date_start = Date.parse(start_date).beginning_of_month
      date_end = Date.parse(end_date).end_of_month


      # OrderedProduct.where("extract(month from created_at) = ? AND extract(year from created_at) = ?", 12, 2017)


      OrderedProduct.includes(:product)
        .where(:created_at => (date_start..date_end))
        .order(:created_at)
        .group_by { |date| date.created_at.month.to_s + "-" + date.created_at.year.to_s }


      # try this: How to deal with different years with same month
      #  OrderedProduct.pluck("date(created_at)").group("date(created_at)")
      #
      # example_range = (Time.zone.today..2.months.from_now)
      # example_range.group_by { |date| date.month.to_s + "-" + date.year.to_s }

    end
  end
end


=begin

# Useful Resources:
1. Grouping ActiveRecord objects by day or week using date_trunc  https://alexpeattie.com/blog/grouping-activerecord-by-day-or-week-with-datetrunc

2. Unlike Ruby, single/double quotes are not interchangeable. Literal strings must be single quoted in Postgres. https://www.postgresql.org/docs/9.4/static/sql-syntax-lexical.html#SQL-SYNTAX-STRINGS

3. Grouping by week/month/etc & ActiveRecord
https://stackoverflow.com/questions/902974/grouping-by-week-month-etc-activerecord

4. Retrieving Multiple Objects in Batches http://guides.rubyonrails.org/active_record_querying.html#retrieving-multiple-objects-in-batches

=end
