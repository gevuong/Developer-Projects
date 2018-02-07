Instructions

Please send a zip archive containing your code and any relevant materials into coding@shipt.com. Include a readme file explaining your assumptions, providing any necessary assumptions, and stating what you would accomplish with more time.

The purpose of this test is to verify your abilities, so this is the time to show everything you know that is applicable and relevant.

Read through the exercise background, complete as much as you can.

Finally, please note that even if you have questions about the test we will not answer them, do what you think is best.

Thank you for taking the time to complete this assessment - we look forward to reviewing your solutions!

Exercise background

Create a very basic API application, where a customer can have an order that is made up of products.

Tasks

Please implement the following stories.

A product belongs to many categories. A category has many products. A product can be sold in decimal amounts (such as weights).

A customer can have many orders. An order is comprised of many products. An order has a status stating if the order is waiting for delivery, on its way, or delivered.

1. Write a SQL query to return the results as display below:

Example

customer_id customer_first_name category_id category_name number_purchased

1 John 1 Bouquets 15

2. Include the previous result as part of a function in the application. If you are using an ORM, please write the query in your ORM's DSL. Leave the original SQL in a separate file.

3. An API endpoint that accepts a date range and a day, week, or month and returns a breakdown of products sold by quantity per day/week/month.

4. Ability to export the results of #5 to CSV.

5. An API endpoint that returns the orders for a customer.

Additional questions

No coding necessary, explain the concept or sketch your thoughts.

We want to give customers the ability to create lists of products for a one-click ordering of bulk items. How would you design the tables, what are the pros and cons of your approach?
# If somebody bought 1000 apples, then you would be hitting the #create controller action 1000 times.
# con: Creating an extra table, requires extra space. Initially, it might be excessive to consider someone buying 1000 apples. But there can be 500 people buying 2 apples. Every product_name should be unique.


# Create a list table to store list of products. The idea is to have a column to store all the list items. And when you want to one click order a bulk of items, then that list gets moved to orders.

If Shipt knew the exact inventory of stores, and when facing a high traffic and limited supply of a particular item, how do you distribute the inventory among customers checking out?
