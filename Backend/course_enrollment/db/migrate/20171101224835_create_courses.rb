class CreateCourses < ActiveRecord::Migration[5.1]
  def change
    create_table :courses do |t|
      t.string :name, null: false
      t.integer :prereq_id # may not always require a prereq to take course
      t.integer :instructor_id
      t.timestamps
    end

  end
end
