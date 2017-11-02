class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.timestamps
    end

    add_index :users, :email, unique: true
    # improve row lookup performance and enforce uniqueness at DB level using index.
  end
end

# A uniqueness: true validation is good for displaying useful feedback to users, but it cannot actually guarantee uniqueness. It operates inside a single server process and doesn't know what any other servers are doing.Two servers could submit queries to the DB with conflicting data at the same time and the validation would not catch it (This happens surprisingly often)

# In production, you're often running multiple web processes (i.e. Unicorn on multiple Heroku dynos) to maximize requests per minute. Enforcing uniqueness at DB level prevents the same email address from being created at around the same time during multiple web processes, which would otherwise bypass model-level validations.
