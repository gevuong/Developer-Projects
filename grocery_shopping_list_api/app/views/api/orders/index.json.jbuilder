  #
  # # @customers_orders.each do |order|
  #   # ordered_products_count = order.ordered_products.length # every order is of different length
  #   products = @customers_orders[0].products
  #   ordered_products = @customers_orders[0].ordered_products
  #   # hash["order_id"] = @customers_orders[0].id
  #
  #   hash = Hash.new { |hash, key| hash[key] = {} }
  #   (0...@customers_orders[0].products.length).each do |idx|
  #     product = products[idx]
  #     ordered_product = ordered_products[idx]
  #     id = ordered_product.id
  #
  #     hash[id]["name"] = product.name
  #     hash[id]["number_purchased"] = ordered_product.number_purchased
  #     p hash
  #   end
  #
  # json.ordered_product_id hash


json.order_id do
  @customers_orders.each do |order|
    json.set! order.id do
      json.extract! order, :status, :created_at, :updated_at

      ordered_products_hash = Hash.new { |hash, key| hash[key] = {} }
      products = order.products
      ordered_products = order.ordered_products
      (0...products.length).each do |idx|

        product = products[idx]
        ordered_product = ordered_products[idx]
        id = ordered_product.id

        ordered_products_hash[id]["name"] = product.name
        ordered_products_hash[id]["number_purchased"] = ordered_product.number_purchased
      end

      json.ordered_product_id ordered_products_hash
    end
  end
end
