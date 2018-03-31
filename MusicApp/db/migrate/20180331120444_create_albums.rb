class CreateAlbums < ActiveRecord::Migration[5.1]
    def change
        create_table :albums do |t|
            t.string :title, null: false
            t.integer :year, null: false
            t.integer :band_id, null: false
            t.boolean :live, null: false, default: false
            t.timestamps
        end

        # can index multiple columns following index to query :band_id or :band_id AND :name (order matters!)
        # https://stackoverflow.com/questions/6169996/index-on-multiple-columns-in-ror#6170023
        add_index :albums, [:band_id, :title], unique: true
    end
end
