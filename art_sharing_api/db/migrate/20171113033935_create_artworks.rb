class CreateArtworks < ActiveRecord::Migration[5.1]
  def change
    create_table :artworks do |t|
      t.string :title, null: false
      t.string :image_url, null: false
      t.integer :artist_id, null: false
      t.timestamps
    end
    add_index :artworks, :artist_id
    add_index :artworks, :image_url, unique: true
    add_index :artworks, [:title, :artist_id], unique: true # for artworks table, a single user cannot have two artworks with the same title, but two separate artists can have artworks of their own with same title. This enforces uniqueness between artist_id and title combination. Does this line not only enforce uniqueness but also add index to :title and artist_id individually?
  end
end
