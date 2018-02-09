# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Order.destroy_all
Product.destroy_all
OrderedProduct.destroy_all
Category.destroy_all
ProductCategory.destroy_all

u1 = User.create(name: "George")
u2 = User.create(name: "Virginia")
u3 = User.create(name: "Andrew")

# an order is comprised of many products
o1 = Order.create(user_id: u1.id)
o2 = Order.create(user_id: u1.id)
o3 = Order.create(user_id: u1.id)

o4 = Order.create(user_id: u2.id)
o5 = Order.create(user_id: u2.id)

o6 = Order.create(user_id: u3.id)

o7 = Order.create(user_id: u1.id, status: "ON ITS WAY")
o8 = Order.create(user_id: u2.id, status: "ON ITS WAY")
o9 = Order.create(user_id: u3.id, status: "ON ITS WAY")

o10 = Order.create(user_id: u1.id, status: "DELIVERED")
o11 = Order.create(user_id: u2.id, status: "DELIVERED")
o12 = Order.create(user_id: u3.id, status: "DELIVERED")

# price by weight
p1 = Product.create(name: "chicken_nuggets", price: 2.95, quantity: 100)
p2 = Product.create(name: "turkey", price: 1.52, quantity: 100)
p3 = Product.create(name: "pork", price: 2.23, quantity: 100)

p4 = Product.create(name: "celery", price: 1.35, quantity: 100)
p5 = Product.create(name: "broccoli", price: 0.56, quantity: 100)
p6 = Product.create(name: "frozen_peas", price: 1.89, quantity: 100)

p7 = Product.create(name: "hungry_man", price: 0.76, quantity: 100)
p8 = Product.create(name: "hot_pocket", price: 0.35, quantity: 100)
p9 = Product.create(name: "hash_browns", price: 2.50, quantity: 100)


op1 = OrderedProduct.create(order_id: o1.id, product_id: p1.id, number_purchased: 1)
op2 = OrderedProduct.create(order_id: o1.id, product_id: p2.id, number_purchased: 2)
op3 = OrderedProduct.create(order_id: o1.id, product_id: p3.id, number_purchased: 3)
op4 = OrderedProduct.create(order_id: o2.id, product_id: p4.id, number_purchased: 4)
op5 = OrderedProduct.create(order_id: o2.id, product_id: p5.id, number_purchased: 5)
op6 = OrderedProduct.create(order_id: o3.id, product_id: p1.id, number_purchased: 6)
op7 = OrderedProduct.create(order_id: o3.id, product_id: p2.id, number_purchased: 7)
op8 = OrderedProduct.create(order_id: o4.id, product_id: p1.id, number_purchased: 8)
op9 = OrderedProduct.create(order_id: o4.id, product_id: p2.id, number_purchased: 9)
op10 = OrderedProduct.create(order_id: o5.id, product_id: p1.id, number_purchased: 10)
op11 = OrderedProduct.create(order_id: o5.id, product_id: p3.id, number_purchased: 11)
op12 = OrderedProduct.create(order_id: o5.id, product_id: p4.id, number_purchased: 12)
op13 = OrderedProduct.create(order_id: o6.id, product_id: p2.id, number_purchased: 13)
op14 = OrderedProduct.create(order_id: o6.id, product_id: p3.id, number_purchased: 14)
op15 = OrderedProduct.create(order_id: o6.id, product_id: p1.id, number_purchased: 15)
op16 = OrderedProduct.create(order_id: o7.id, product_id: p7.id, number_purchased: 16)
op17 = OrderedProduct.create(order_id: o8.id, product_id: p8.id, number_purchased: 17)
op18 = OrderedProduct.create(order_id: o9.id, product_id: p9.id, number_purchased: 18)
op19 = OrderedProduct.create(order_id: o10.id, product_id: p4.id, number_purchased: 19)
op20 = OrderedProduct.create(order_id: o11.id, product_id: p5.id, number_purchased: 20)
op21 = OrderedProduct.create(order_id: o12.id, product_id: p6.id, number_purchased: 21)

c1 = Category.create(name: "poultry")
c2 = Category.create(name: "vegetables")
c3 = Category.create(name: "frozen_foods")

pc1 = ProductCategory.create(category_id: c1.id, product_id: p1.id)
pc2 = ProductCategory.create(category_id: c1.id, product_id: p2.id)
pc3 = ProductCategory.create(category_id: c1.id, product_id: p3.id)

pc4 = ProductCategory.create(category_id: c2.id, product_id: p4.id)
pc5 = ProductCategory.create(category_id: c2.id, product_id: p5.id)
pc6 = ProductCategory.create(category_id: c2.id, product_id: p6.id)

pc7 = ProductCategory.create(category_id: c3.id, product_id: p1.id)
pc8 = ProductCategory.create(category_id: c3.id, product_id: p6.id)
pc8 = ProductCategory.create(category_id: c3.id, product_id: p7.id)
pc9 = ProductCategory.create(category_id: c3.id, product_id: p8.id)
pc9 = ProductCategory.create(category_id: c3.id, product_id: p9.id)
