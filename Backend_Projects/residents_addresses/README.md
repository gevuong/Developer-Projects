# README

Create a simple Rails project to model the relationships between people and houses. By the end of this project, each Person will live in a house and each House will have an address. You will be able to call House.residents and get a list of the people that live in that House. You will also be able to call Person.house and get the House that that Person lives in.

**ApplicationRecord will act as an intermediary class that we use to extend our model classes with ActiveRecord::Base.**

Things you may want to cover:
* Ruby version
```
gem install rails -v '5.1.2'
```

* System dependencies
```
gem 'annotate'

- These two give you a great error handling page. But make sure to never use them in production!
gem 'better_errors'
gem 'binding_of_caller'

gem 'byebug'
gem 'pry-rails'
```

* Configuration
```
Open postgresql
rails new demo_project --database=postgresql
bundle install
```

* Database creation
```
- rails db:create
- rails db:schema:load
  There is no need (and it is error prone) to initialize a new database by replaying the entire migration history. It is much simpler and faster to just load into the database a description of the current schema (rails db:schema:load).
- rails db:migrate

- Instead of rake db:somecommand, you can now do rails db:somecommand. Note that using rake still works, but using rails standardizes Rails commands in the terminal.
```

* Database initialization
```
- rails g migration <SpecifyActionToWhichTable> (CamelCase)
- rails db:seed
- rails db:rollback
- rails g model <singular noun>
```

* How to run the test suite
```
house = House.new(address: '308 Negra Arroyo Lane')
person = Person.new(name: 'Walter White', house_id: house.id)
house.save!
person.save!
use #create! to create a new record and immediately save it to the db:
House.create!(address: '123 Fake St')
```
- Associations tell ActiveRecord that there is a connection between two models (or tables). **The belongs_to and has_many methods exist in a module named ActiveRecord::Associations::ClassMethods. ActiveRecord::Base extends this module, so the association methods are available as class methods.** These class methods define instance methods: in this case, House#people and Person#house. Class methods like this are called **macros**.

```
House.all[0].residents # returns a list of people that live in that house
Person.all[0].house # returns the house that the person lives in.
rails dbconsole: If you want to access a SQL console, you may conveniently run
```

* Services (job queues, cache servers, search engines, etc.)
```
- reload! Another trick: you're used to using load to re-load source code from the console. In the Rails console, run the reload! command; this will re-load all the model classes.
- To destroy two tables, films and distributors: DROP TABLE films, distributors;
- be annotate
```

* Deployment instructions

* ...

## Trivia Notes
* The ActiveRecord ORM translates rows from your SQL tables into Ruby objects on fetch, and translates your Ruby objects back to rows on save. The ORM also empowers your Ruby classes with convenient methods to perform common SQL operations.

* For each table, we define a Ruby model class; an instance of the model will represent an individual row in the table. For instance, a physicians table will have a corresponding Physician model class; when we fetch rows from the physicians table, we will get back Physician objects. **All model classes extend ApplicationRecord, which in turn extends ActiveRecord::Base.** Methods in ActiveRecord::Base will allow us to fetch and save Ruby objects from/to the table.

* **ApplicationRecord will act as an intermediary class that we use to extend our model classes with ActiveRecord::Base. (Rails uses this intermediary class to avoid being in situations where we would have to include modules directly on ActiveRecord::Base. ApplicationRecord essentially keeps ActiveRecord::Base clean.)**

* **By extending ActiveRecord::Base through ApplicationRecord, your model class will automatically receive getter/setter methods for each of the database columns. This is convenient, since you won't have to write attr_accessor for each column.** For example:

```
# create a new Physician object
jonas = Physician.new

# set some fields
jonas.name = 'Jonas Salk'
jonas.college = 'City College'
jonas.home_city = 'La Jolla'
```

* ActiveRecord needs primary_key and foreign_key attributes to generate proper SQL query.

* The difference between the two #save! and #save is that #save! will warn you if you fail to save the object, whereas #save will quietly return false (it returns true on success).

* Big difference between rails console and pry/irb is that the console will take care of loading your Rails application so you won't have to require your model classes manually. It will also open up a connection to the DB for you. This is handy, because you can immediately start playing with your app, rather than first requiring and loading a bunch of supporting classes.
