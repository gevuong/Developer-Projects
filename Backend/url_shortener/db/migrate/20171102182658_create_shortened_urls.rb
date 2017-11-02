class CreateShortenedUrls < ActiveRecord::Migration[5.1]
  def change
    create_table :shortened_urls do |t|
      t.string :long_url, null: false
      t.string :short_url, null: false
      t.integer :submitter_id, null: false
      t.timestamps
    end
    add_index :shortened_urls, :short_url, unique: true
    add_index :shortened_urls, :submitter_id
  end
end

# User provides a long URL to our app, and app returns a unique short_url. Submitter can submit the same long_url, but it needs to return a unique short_url. See https://goo.gl/ for example.

# Alternative, to reduce database size, factor our long_url to its own model, LongUrl, and store long_url.id foreign key in ShortenedUrl. If URL is super long this would reduce data usage by allowing multiple short_urls to reference a single LongUrl via foreign_key, removing duplication of the long url string.

# For this reason, we can expect better performance by storing the long url in the shortened_urls table. Ultimately, for our implementation we have chosen to prefer performance over reducing our database size.

# ActiveRecord still executes a single query, but SQL will be doing more work under the hood. Drawback is creating a two step lookup to find short URL.
# 1. Find matching short_url in ShortenedUrl table.
# 2. Find matching long_url_id foreign key to longUrl.id primary key.
