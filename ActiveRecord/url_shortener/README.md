## URL Shortener: Part SQL


![url shortener gif](images/url_shortener.gif)


In this project, we'll build a tool that will take an arbitrarily-long URL and will shorten it for the user. Subsequent users can then give the short URL back to our tool and be redirected to the original URL. We'll also track clickthroughs, since these can be really helpful for business analytics.

URL-shortening apps are useful for embedding long URLs in
space-constrained messages like tweets. You can play around with
[Google's shortener][goo-gl] if you'd like to get a feel for how
this works.

We'll have a simple CLI tool, though we can use the `launchy` gem to pop open the original URL in a browser.


## Learning Goals

* Be able to create a new Rails project
* Be able to navigate a Rails project using the keyboard
* Be able to change the database using migrations
* Be able to write both database constraints and model-level validations
* Be able to write associations
* Understand the purpose of adding an index to columns in our database


## To run application on CLI
* Run CLI script using `rails runner bin/cli` when you are in url_shortener directory. This will run the Rails environment, allowing you to access classes without requiring them explicitly. rails runner will also connect to the DB to query tables.
* `launchy` gem is added to Gemfile and is used to open a URL in browser, which records a visit.
* Write a simple command-line script interface in bin/cli, and omit the .rb extension. Instead, write #!/usr/bin/env ruby on the first line of the file to tell the command-line interpreter that this is a ruby file. This is known as a `Shebang`.


### Trivia Notes
* ActiveRecords #validates class method validates state of object/list of column names before they go into DB. If these validations produce any errors, Rails does not save the object. You can also run these validations on your own. valid? triggers your validations and returns true if no errors were found in the object, and false otherwise.

* DB constraints will keep bugs in our Rails app from putting bad data into the database, and stop bad data coming from other sources (SQL scripts, the database console, etc). Use simple DB constraints to ensure data consistency.

* However, for complicated validations, DB constraints can be difficult to write in SQL. Also, when a DB constraint fails, a generic error is thrown to Rails (SQLException). In general, Rails will not handle errors like these, and a web user's request will fail with an ugly 500 Internal Server Error.

* A "uniqueness: true" validation is good for displaying useful feedback to users, but it cannot actually guarantee uniqueness. It operates inside a single server process and doesn't know what any other servers are doing. Two servers could submit queries to the DB with conflicting data at the same time, and the validation would not catch it (This happens surprisingly often).
