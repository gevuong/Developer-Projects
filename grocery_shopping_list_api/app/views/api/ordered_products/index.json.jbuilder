# rather than build HTML views, Jbuilder allows us to construct JSON views
if @type == "day"
  json.ordered_products_per_day do
    @dates_hash.each do |date, ordered_products|
      json.set! date do
        h = Hash.new { |hash, key| hash[key] = Hash.new(0) }
        ordered_products.each do |ordered_product|
          h[ordered_product.product_id]["name"] = ordered_product.product.name
          h[ordered_product.product_id]["quantity_sold"] += ordered_product.number_purchased
        end
        json.product_id h
      end
    end
  end

elsif @type == "week"
  json.ordered_products_per_week @dates_hash
  # json.ordered_products_per_week do
  #   @dates_hash.each do |date, ordered_products|
  #     json.set! date do
  #       h = Hash.new { |hash, key| hash[key] = Hash.new(0) }
  #       ordered_products.each do |ordered_product|
  #         h[ordered_product.product_id]["name"] = ordered_product.product.name
  #         h[ordered_product.product_id]["quantity_sold"] += ordered_product.number_purchased
  #       end
  #       json.product_id h
  #     end
  #   end
  # end

elsif @type == "month"
  json.ordered_products_per_month do
    @dates_hash.each do |date, ordered_products|
      json.set! date do
        h = Hash.new { |hash, key| hash[key] = Hash.new(0) }
        ordered_products.each do |ordered_product|
          h[ordered_product.product_id]["name"] = ordered_product.product.name
          h[ordered_product.product_id]["quantity_sold"] += ordered_product.number_purchased
        end
        json.product_id h
      end
    end
  end

end


# json.set! :author do
#   json.set! :name, 'David'
# end
# => {"author": { "name": "David" }}

# For more info on jbuilder syntax: https://github.com/rails/jbuilder
