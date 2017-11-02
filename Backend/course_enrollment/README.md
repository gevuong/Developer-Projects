# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

*  ActiveRecords validations feature validates state of object before they go into DB. If these validations produce any errors, Rails does not save the object. You can also run these validations on your own. valid? triggers your validations and returns true if no errors were found in the object, and false otherwise. Example: 
```
class Person < ApplicationRecord
  validates :name, presence: true
end

Person.create(name: "John Doe").valid? # => true
Person.create(name: nil).valid? # => false
```
