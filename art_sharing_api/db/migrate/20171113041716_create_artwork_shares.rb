class CreateArtworkShares < ActiveRecord::Migration[5.1]
  def change # artworkshares is a joins table to link a User (viewing the artwork) with an Artwork
    create_table :artwork_shares do |t|
      t.integer :artwork_id, null: false
      t.integer :viewer_id, null: false
      t.timestamps
    end
    # almost always create indices for foreign keys for fast lookup, especially if used in a has_many or has_one relationship
    add_index :artwork_shares, :artwork_id
    add_index :artwork_shares, :viewer_id
    add_index :artwork_shares, [:artwork_id, :viewer_id], unique: true # ensures that a user cannot have single artwork shared with them more than once. Does this line not only enforce uniqueness but also add index to :title and artist_id individually?
  end
end
