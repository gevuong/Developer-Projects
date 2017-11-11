# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

### Trivia Notes
* ActiveRecords #validates class method validates state of object/list of column names before they go into DB. If these validations produce any errors, Rails does not save the object. You can also run these validations on your own. valid? triggers your validations and returns true if no errors were found in the object, and false otherwise.

* DB constraints will keep bugs in our Rails app from putting bad data into the database, and stop bad data coming from other sources (SQL scripts, the database console, etc). Use simple DB constraints to ensure data consistency.

* However, for complicated validations, DB constraints can be difficult to write in SQL. Also, when a DB constraint fails, a generic error is thrown to Rails (SQLException). In general, Rails will not handle errors like these, and a web user's request will fail with an ugly 500 Internal Server Error.

* A "uniqueness: true" validation is good for displaying useful feedback to users, but it cannot actually guarantee uniqueness. It operates inside a single server process and doesn't know what any other servers are doing. Two servers could submit queries to the DB with conflicting data at the same time, and the validation would not catch it (This happens surprisingly often).
