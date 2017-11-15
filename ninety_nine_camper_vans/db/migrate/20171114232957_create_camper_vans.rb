class CreateCamperVans < ActiveRecord::Migration[5.1]
  def change
    create_table :camper_vans do |t|
      t.string :year, null: false
      t.string :make, null: false
      t.string :model, null: false
      t.string :color, null: false
      t.integer :mileage, null: false
      t.text :description, null: false
      t.timestamps
    end
  end
end
