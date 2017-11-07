class CreateTagTopics < ActiveRecord::Migration[5.1]
  def change
    create_table :tag_topics do |t|
      t.string :name, null: false
      t.timestamps
    end
    add_index :names, :tag_topic, unique: true 
  end
end
