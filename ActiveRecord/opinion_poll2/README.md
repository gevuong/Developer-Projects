# README

# Polls

We're going to build an opinion polling app.

## Learning Goals

* Be able to write migrations with indices and constraints
* Know how to fix the effects of incorrect migrations
* Be able to write associations
* Know how to seed a project's database
* Be able to write custom validations in the model
* Be able to solve the N+1 query problem


### Trivia Notes

### N+1 Query problem
* Lets get the number of comments per Post by a User.

```
# app/models/user.rb
class User < ApplicationRecord
  # ...

  def n_plus_one_post_comment_counts
    posts = self.posts
    # SELECT *
    #   FROM posts
    #  WHERE posts.author_id = ?
    #
    # where `?` gets replaced with `user.id`

    post_comment_counts = {}
    posts.each do |post|
      # This query gets performed once for each post. Each db query
      # has overhead, so this is very wasteful if there are a lot of
      # `Post`s for the `User`.
      post_comment_counts[post] = post.comments.length
      # SELECT *
      #   FROM comments
      #  WHERE comments.post_id = ?
      #
      # where `?` gets replaced with `post.id`
    end

    post_comment_counts
  end
end
```

The above code executes 1 query (to find the user's posts) + "N" queries (one per post to find the comments) for N+1 queries in total.

This is inefficient. Consider if a user had 10,000 posts: we'd make 10,000 queries for comments. We will next see a way to perform one query for all the comments, instead of N queries. Even though we will receive the same number of comments rows total, doing all the work in one query is much more efficient. Each query to the database has some fixed overhead associated with it, so batching up work into one query is a major efficiency win.


## Solution to N+1 queries problem

The solution to this problem is to fetch all the Comments for all the Posts in one go, rather than fetch them one-by-one for each Post.

Active Record lets you specify associations to prefetch. When you use these associations later, the data will already have been fetched and won't need to be queried for. To do this, use the includes method. If you use includes to prefetch data (e.g., posts = user.posts.includes(:comments)), a subsequent call to access the association (e.g., posts[0].comments) won't fire another DB query; it'll use the prefetched data.


Revisiting the above case, we could rewrite post_comment_counts to use eager loading:

```
# app/model/user.rb
class User < ApplicationRecord
  # ...

  def includes_post_comment_counts
    # `includes` *prefetches the association* `comments`, so it doesn't
    # need to be queried for later. `includes` does not change the
    # type of the object returned (in this example, `Post`s); it only
    # prefetches extra data.
    posts = self.posts.includes(:comments)
    # Makes two queries:
    # SELECT *
    #   FROM posts
    #  WHERE post.author_id = ?
    #
    # where `?` is replaced with `user.id`.
    #
    # ...and...
    #
    # SELECT *
    #   FROM comments
    #  WHERE comments.post_id IN ?
    #
    # where `?` is replaced with `self.posts.map(&:id)`, the `Array`
    # of `Post` ids.

    post_comment_counts = {}
    posts.each do |post|
      # doesn't fire a query, since already prefetched the association
      # way better than N+1
      #
      # NB: if we write `post.comments.count` ActiveRecord will try to
      # be super-smart and run a `SELECT COUNT(*) FROM comments WHERE
      # comments.post_id = ?` query. This is because ActiveRecord
      # understands `#count`. But we already fetched the comments and
      # don't want to go back to the DB, so we can avoid this behavior
      # by calling `Array#length`.
      post_comment_counts[post] = post.comments.length
    end

    post_comment_counts
  end
end
```

The above code will execute just 2 queries, as opposed to N+1 queries. When there are many posts, this is a major win.

Normally you should wait until you see performance problems before returning to optimize code ("premature optimization is the root of all evil"). However, N+1 queries are so egregious that you should avoid them from the beginning. Consider N+1 queries an error; they are never the right solution.
