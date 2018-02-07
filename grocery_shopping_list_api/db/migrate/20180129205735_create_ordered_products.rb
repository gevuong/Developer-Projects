class CreateOrderedProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :ordered_products do |t|
      t.integer :order_id, null: false
      t.integer :product_id, null: false
      t.integer :number_purchased, null: false
      t.timestamps
    end
    add_index :ordered_products, :order_id
    add_index :ordered_products, :product_id
  end
end
