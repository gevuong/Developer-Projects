class Api::OrdersController < ApplicationController
  def create
    order = Order.new(order_params)
    if order.save
      render json: order, status: 201 # created
    else
      render order.errors.full_messages, status: 422
    end
  end

  def index
    # params[:user_id] comes from wildcard in route parameters
    if params[:user_id]
      @customers_orders = Order.includes(:products).orders_for_user_id(params[:user_id])
      # render json: customers_orders
      render :index

      CSV.open(customer_orders.csv)
    else
      orders = Order.all
      render json: orders

      # respond_to do |format|
      #   format.html
      #   format.csv { render text: orders.to_csv }
      # end

      CSV.open("all_orders.csv", "w") do |csv|
        csv << ["order_id", "status", "created_at", "updated_at", "ordered_product_id", "name", "number_purchased"]
        orders.each do |order|
          csv << order.attributes.values
        end
      end
    end
  end

  private

  def order_params
    params.require(:order).permit(:status, :user_id)
  end
end
