class CreateUsernameColumnInUsersTable < ActiveRecord::Migration[5.1]
  def change
    create_table :username_column_in_users_tables do |t|
      rename_column :users, :name, :username
      add_index :users, :username, unique: true
    end
  end
end
