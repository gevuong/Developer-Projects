class CreatePeople < ActiveRecord::Migration[5.1]
  def change
    create_table :people do |t|
      t.string :name, null: false # enforces every person to have a name
      t.integer :house_id, null: false
      t.timestamps
    end
  end
end

# In general, the format is:
# t.data_type :column_name, { option1: :option_value, option2: :option_value }
