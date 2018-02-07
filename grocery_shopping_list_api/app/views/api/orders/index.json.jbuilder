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
