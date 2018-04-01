class CreateAlbums < ActiveRecord::Migration[5.1]
    def change
        create_table :albums do |t|
            t.string :title, null: false
            t.integer :year, null: false
            t.integer :band_id, null: false
            t.boolean :live, null: false, default: false
            t.timestamps
        end

        # this uniqueness DB constraint is equivalent to model-level uniqueness validation using :scope option. Index multiple columns to query :band_id or :band_id AND :name (order matters!) https://stackoverflow.com/questions/6169996/index-on-multiple-columns-in-ror#6170023
        add_index :albums, [:band_id, :title], unique: true

    end
end
