# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

### Trivia Notes
* Not only will they keep bugs in our Rails app from putting bad data into the database, they'll also stop bad data coming from other sources (SQL scripts, the database console, etc). We will frequently use simple DB constraints like these to ensure data consistency.

* However, for complicated validations, DB constraints can be tortuous to write in SQL. Also, when a DB constraint fails, a generic error is thrown to Rails (SQLException). In general, Rails will not handle errors like these, and a web user's request will fail with an ugly 500 Internal Server Error.

* A uniqueness: true validation is good for displaying useful feedback to users, but it cannot actually guarantee uniqueness. It operates inside a single server process and doesn't know what any other servers are doing. Two servers could submit queries to the DB with conflicting data at the same time and the validation would not catch it (This happens surprisingly often).

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
