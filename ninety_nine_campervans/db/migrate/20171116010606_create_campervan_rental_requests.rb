class CreateCampervanRentalRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :campervan_rental_requests do |t|
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :campervan_id, null: false
      t.string :status, null: false
      t.timestamps
    end
    add_index :campervan_rental_requests, :campervan_id
  end
end
