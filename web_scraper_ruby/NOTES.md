Steps To Implement
1. Create rails app.
   - rails new motorsports_api --database=postgresql
   - rails g model Event
   -

2.
```
 doc = Nokogiri::HTML(open(@scrapper.url ))
 items = doc.css(".s-item-container")
 items.each do |item|
   Product.create!(
       title: item.css(".s-access-title").text.strip,
       price: item.css(".s-price").text.to_d,
       rating: item.css("span+ .a-text-normal").text.to_f)
 end
 to prevent duplicates

 items.each do |item|
     title = item.css(".s-access-title").text.strip
     product = Product.find_or_initialize(title: title)
     product.price = item.css(".s-price").text.to_d
     product.rating = item.css("span+ .a-text-normal").text.to_f
     product.save!
   end
```
2.
