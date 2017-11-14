class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false
      t.integer :likeable_id, null: false
      t.string :likeable_type, null: false # refers to whichever instance can be liked (i.e. 'Comment' or 'Artwork' in this case).
      
      # t.references :likeable, polymorphic: true, index: true <-- simplified form to declare both a foreign key column and a type column in the model that declares the polymorphic interface
      t.timestamps
    end
    add_index :likes, [:likeable_id, :likeable_type] # need to declare both a foreign key column and a type column in the model that declares the polymorphic interface
    add_index :likes, [:user_id, :likeable_type], unique: true  # ensure that user cannot like something more than once I assume
  end
end
