# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* The errors method is only useful after validations have been run, because it only inspects the errors collection and does not trigger validations itself. You should always first run valid? or save or some such before trying to access errors

```
class Person < ApplicationRecord
  validates :name, presence: true
end

>> p = Person.new
#=> #<Person id: nil, name: nil>
>> p.errors
#=> {}

>> p.valid?
#=> false
>> p.errors
#=> {:name=>["can't be blank"]}

>> p = Person.create
#=> #<Person id: nil, name: nil>
>> p.errors
#=> {:name=>["can't be blank"]}
```

To get an array of human readable messages.
```
>> p = Person.create
#=> #<Person id: nil, name: nil>
>> p.errors.full_messages
#=> ["Name can't be blank"]
```

## Trivia Notes
* **Validations are used to ensure that only valid data is saved into your database. For example, it may be important to your application to ensure that every user provides a valid email address and mailing address. Model-level validations are the best way to ensure that only valid data is saved into your database.**

* There are several other ways to validate data before it is saved into your database, including native database constraints, client-side validations and controller-level validations.

* Database constraints and/or stored procedures make the validation mechanisms database-dependent and can make testing and maintenance more difficult. However, **if your database is used by other applications, it may be a good idea to use some constraints at the database level.**

* It's important to index columns that are heavily used for lookups in queries. **When you index a column, it creates a sorted data structure with pointers to the actual table. Since it's sorted, lookups can use binary search, which as you recall runs in O(log n) time.** Log base 2 of 10 million is about 23, so as you can imagine, this improves database performance (and our career prospects) dramatically.

* Indices make writes (INSERTs, DELETEs, and UPDATEs) a little more taxing because the index must be updated. So it's important to index the right things. On that note, **foreign keys are pretty much always a good choice for indexing because they're frequently used in both WHERE clauses and in JOIN conditions,** both of which can be incredibly taxing when not indexed.

* Example: Both a Physician and a Patient may have many appointments. What if we want to get all the Patients who have an Appointment with a given Physician? One way to do this is to get the Appointments for the Physician, then loop through these to get the Patient objects.

* **An N+1 query: we do one query for the first fetch of appointments, and then N queries for patient, one for each of N appointments. As a Physician gains more Appointments, this will grow slower and slower.** Solution is to use a has_many :through that links up two existing associations. A has_many :through association simply names two existing associations and links them up.

* How does has_many :through work? What SQL does it generate? Through a process that should seem magical to you right now, has_many :through will combine the two associations into a single query using a JOIN

* ActiveRecords #validates class method validates state of object/list of column names before they go into DB. If these validations produce any errors, Rails does not save the object. You can also run these validations on your own. valid? triggers your validations and returns true if no errors were found in the object, and false otherwise. Example:
```
class Person < ApplicationRecord
  validates :name, presence: true
end
# Person.create actually attempts to store record in DB then return .valid?
# Person.new does not attempt to store record in DB, and returns true or false.

Person.new(name: "John Doe").valid? # => true
Person.new(name: nil).valid? # => false
```

* If any validations fail, the object will be marked as invalid and Active Record will not perform the INSERT or UPDATE operation. This keeps invalid data from being inserted into the database.

To signal success saving the object, save will return true; otherwise false is returned. save! will instead raise an error if the validations fail.
