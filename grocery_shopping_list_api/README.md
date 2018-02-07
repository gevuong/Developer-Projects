# README
Explain your assumptions, provide any necessary assumptions, and state what you would accomplish with more time.

**Assumptions**
- A user can have many orders. A single order can have many products, but a product cannot belong to an order. If that was the case, and a customer ordered 1000 quantity of a product, then there would be 1000 instances of apples that belong_to an order. Then an order can have many orders. An ordered_product belongs_to an order, and includes number_purchased.

- A product does not belong to an order. A product can have many orders. This means that if a user orders 1000 apples, there won't be

**Future Goals w/ More Time**
- Include CSRF (cross-site request forgery) protection by creating valid authenticity token
- Calculate total price of all inventory of products being ordered by customer.
- Incorporate user authentication and sessions controller to login as different users.
- Create additional controller actions for a customer removes a product from their order or updates amount.
- Create .erb views to render and operate basic functionality of adding products to a customers order.
- Fat model, skinny controller best practice.

**Additional Questions**
No coding necessary, explain the concept or sketch your thoughts.

**We want to give customers the ability to create lists of products for a one-click ordering of bulk items. How would you design the tables, what are the pros and cons of your approach?**

1. From what I understand, creating lists of products for a one-click ordering of bulk items means that a single order will contain many products, each product being ordered in bulk. To design the tables for this, I would create a joins table between orders and products.

# Create a list table to store list of products. The idea is to have a column to store all the list items. And when you want to one click order a bulk of items, then that list gets moved to orders.

**Question: If Shipt knew the exact inventory of stores, and when facing a high traffic and limited supply of a particular item, how do you distribute the inventory among customers checking out?**

When facing high traffic and limited supply of a particular item, I would consider discussing the following concepts.

1. Limit the number of the same product a customer can add/order to their cart. For example, Shipt knows there are only 15 one gallon Organic Valley whole milk left in stock. A customer is allowed to order only one of that item. When a customer has purchased the milk, their customer_id and/or shipping address will be logged. This prevents the same customer_id from purchasing the same item more than once and shipping the item to the same address. Because Shipt is membership-based, a customer will unlikely create a new Shipt account membership just to order that same item again.
**Note:** This will not stop the customer from creating a new account, and order and shipping the same item to another address. However, I would think there are only so many addresses you can ship the item to.

2. When the item is added to the cart or ordered, the number_available of that item is decreased by the quantity added to cart. For example, if there was only one 1gal milk available, and a customer adds the item to their cart, then the item would no longer be available even though the customer technically did not purchase the product yet. This prevents any issues with multiple customers added the same product to their cart when there is only one item left.

3. Implement a timer for how long the item can be in a customer's cart for. For example, when purchasing tickets on Ticketmaster or StubHub, there is a 6-10min countdown from when the customer added the ticket(s) to his/her cart. When countdown reaches zero, the n the tickets are added in the pool of available tickets.
