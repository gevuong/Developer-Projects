class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, null: false 
      t.string :password_digest, null: false 
      t.string :session_token, null: false 
      t.timestamps
    end
    # DB constraints: add indices to email and session_token to speed lookup time and ensure uniqueness. No two users should share the same email or session_token
    add_index :users, :email, unique: true 
    add_index :users, :session_token, unique: true 
  end
end
