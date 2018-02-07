class Api::ProductsController < ApplicationController
  def create
    product = Product.new(product_params)
    if product_save
      render json: product, status: 201 # created
    else
      render product.errors.full_messages, status: 422
    end
  end

  def show
    render json: Product.find(params[:id])
  end

  def index
    render json: Product.all
  end

  private

  def product_params
    params.require(:product).permit(:name, :price, :order_id)
  end
end
