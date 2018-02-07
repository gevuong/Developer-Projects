class Api::OrderedProductsController < ApplicationController
  def create
    ordered_product = OrderedProduct.new(ordered_product_params)
    remaining_quantity = ordered_product.product.quantity - ordered_product.number_purchased

    if remaining_quantity < 0
      render json: { message: "there are not enough #{ordered_product.product.name} available" }, status: 422
    elsif ordered_product.save
      ordered_product.product.update_attributes(:quantity => remaining_quantity)
      render json: ordered_product, status: 201 # created
    else
      render ordered_product.errors.full_messages, status: 422
    end
  end


  def index
    if params[:start_date] && params[:end_date] && params[:type]
      # render products sold per day/week/month
      # :start_date :end_date comes from query string in format: '2018-1-29'
      @dates = OrderedProduct.fetch_ordered_products(params[:start_date], params[:end_date], params[:type])

      render :index

    elsif params[:start_date] && params[:end_date]
      date_start = Date.parse(params[:start_date])
      date_end = Date.parse(params[:end_date])

      # Step 2: retrieve ordered_products within parsed date_range
      # remaining_ordered_products = OrderedProduct.where('ordered_products.created_at BETWEEN ? AND ?', date_start, date_end)

      date_range = (date_start..date_end).to_a

      @dates = Hash.new
      date_range.each do |date|
        @dates[date] = OrderedProduct.where("date(created_at) = ?", date)
      end

    else
      # ordered_product pertaining to customer if customer wildcard is given, if not then show all ordered_product
      ordered_products = OrderedProduct.all
      render json: ordered_products

    end

  end

  private

  def ordered_product_params
    params.require(:ordered_product).permit(:order_id, :product_id, :number_purchased)
  end
end
