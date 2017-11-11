### Trivia Notes

open postgres
rails new project_name --database=postgresql
bundle install
rails db:create
be rails routes

* A resource is anything in your application that you will be CRUDing.

* A RESTful resource can either be a collection of objects or a single instance. These collections/instance have access to CRUD actions dictated by HTTP methods.

* The idea that in REST is that URLs refer to either collections of resources (i.e. collection of user objects) or a single instance of resources. The different HTTP methods specify the limited number of things you can do to a collection/instance (create, read, update, destroy).

* The REST philosophy is that even more complicated actions, like "liking a photo", should be thought of in terms of CRUD (create/read/update/destroy) actions on resources. For instance, instead of creating a custom, non-RESTful controller action to "like" a photo, we might create a new resource, a Like object, which we could either create/destroy in the normal way.

* Applications, and especially web APIs, are all about connecting data in your database with the outside world.

* Browsers aren't the only program that can make HTTP requests. When a non-browser client makes an API request, the requestor probably prefers a raw representation of the data rather than an HTML document that includes a lot of extraneous formatting information and is difficult to parse. JSON is typically a better format for non-browser clients.

* The key to building a Rails API is to get your controllers to convert model objects into JSON, and then return the JSON. This requires support at two layers: the model layer (convert a model to JSON) and the controller layer (return the JSON to the user).
