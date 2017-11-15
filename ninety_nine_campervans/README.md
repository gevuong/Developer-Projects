# README

### Trivia Notes
* ERB (embedded Ruby) is simply helping construct HTML server-side. When the view is finished rendering, it will be pure HTML and it is the pure HTML when it is sent out to the user. Your user will never know you are using ERB.

* Output functions like print or puts won't work with ERB templates.

* Controllers make data available to the view layer by setting instance variables. When the view is rendered, it copies over the instance variables of the controller so that the view has access to the variables; the view cannot otherwise get access to the controller or its methods.

* It is good practice to make all your database queries inside the controller, setting the results to instance variables. Never make database queries in your views; it can make it harder to find hidden performance issues caused by unintended queries.

`link_to` generates the HTML code for a link. Here's a few uses:

```
<%= link_to 'Cat Pictures', "http://cashcats.biz" %>
<a href="http://cashcats.biz">Cat Pictures</a> <!-- output -->

<%= link_to 'New Comment', new_comment_url %>
<a href="<%= new_comment_url %>">New Comment</a> <!-- equivalent to the above code -->
<a href="www.example.com/comments/new">New Comment</a> <!-- output -->
```

* When a user clicks on an anchor tag, a GET request is issued. If you want to issue a POST, PATCH, or DELETE request, you can use a button and specify the method

```
<%= button_to 'Delete comment', comment_url(@comment), method: :delete %>
<form action="<%= comment_url %>"  method="POST"> <!-- equivalent to the above -->
  <input type="hidden" value="delete" name="_method" />
  <input type="submit" value="Delete comment" />
</form>
```
* Using ActiveRecord's `.find()` raises an exception if it cannot find it. However, `.find_by()` will return nil if it cannot find it.

* ActiveRecord's `.save!` raises an exception, however, `.save` returns either true or false if instance can be saved to DB or not.
* ActiveRecord's `.update_attributes` will try to change the attributes and save it, and return true or false, similar to `.save`.

* PUTS HTTP Verb is used if we want to replace an existing object entirely. We will mostly use PATCH HTTP verb to change a few attributes of an existing object. Both HTTP verbs direct to the controller#upate action.
