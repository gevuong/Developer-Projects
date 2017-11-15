class AddNameColumnToCampervans < ActiveRecord::Migration[5.1]
  def change
    add_column :campervans, :name, :string, null: false
  end
end
