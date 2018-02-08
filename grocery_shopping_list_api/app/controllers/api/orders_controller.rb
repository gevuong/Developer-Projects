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
    if params[:user_id]
      @customers_orders = Order.includes(:products).orders_for_user_id(params[:user_id])
      render :index

      # figure out how to export nested json to CSV...
      column_headers = ["id", "user_id", "status", "created_at", "updated_at"]
      
      CSV.open("customer_orders.csv", "w") do |csv|
        csv << ["id", "user_id", "status", "created_at", "updated_at"]
        @customers_orders.each do |customer_order|
          csv << customer_order.attributes.values
        end
      end

    else
      orders = Order.all
      render json: orders

      column_headers = ["id", "user_id", "status", "created_at", "updated_at"]
      CSV.open("all_orders.csv", "w") do |csv|
        csv << column_headers
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
