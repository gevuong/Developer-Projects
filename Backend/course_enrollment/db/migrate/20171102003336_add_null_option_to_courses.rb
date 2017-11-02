class AddNullOptionToCourses < ActiveRecord::Migration[5.1]
  def change
    change_column :courses, :instructor_id, :integer, null: false
  end
end
