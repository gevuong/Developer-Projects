class Api::OrderedProductsController < ApplicationController

  def create
    ordered_product = OrderedProduct.new(ordered_product_params)
    remaining_quantity = ordered_product.product.quantity - ordered_product.number_purchased

    # can write method to check remaining quantity in models
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
    # render products sold per day/week/month
    # :start_date :end_date comes from query string in format: '2018-1-29'

    if params[:start_date] && params[:end_date] && params[:type]
      @type = params[:type]
      @dates_hash = OrderedProduct.fetch_ordered_products(params[:start_date], params[:end_date], params[:type])

      render :index

    else
      ordered_products = OrderedProduct.all
      render json: ordered_products

    end

  end

  private

  def ordered_product_params
    params.require(:ordered_product).permit(:order_id, :product_id, :number_purchased)
  end
end
