# == Schema Information
#
# Table name: courses
#
#  id            :integer          not null, primary key
#  name          :string           not null
#  prereq_id     :integer
#  instructor_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Course < ApplicationRecord
  validates :name, presence: true
  validates :instructor_id, presence: true
  # validates :prereq_id, presence: true # prevents rails db:seed from successfully executing and storing data in DB because seeded data is missing prereq_id. Get "Validation failed: Prereq can't be blank".

  # Remember, "has_many" is a class method where first arg is name of association instance method, and second arg is an options hash.
  has_many :enrollments,
  primary_key: :id,
  foreign_key: :course_id,
  class_name: :Enrollment

  has_many :enrolled_students,
  through: :enrollments,
  source: :student
  #student instance method specified in class Enrollment, must be lowercase

  # Remember, "belongs_to" is a class method where first argument is name of association instance method, and second argument is an options hash.
  belongs_to :prerequisite,
  primary_key: :id,
  foreign_key: :prereq_id, # foreign_key so use "belongs_to"
  class_name: :Course,
  optional: true # without this line, returns "Validation failed: Prerequisite must exist". Rails 5 auto validates belongs_to #prerequisite association.
  # If instance of Course has a prereq_id that does not match any course.id (due to class_name: :Course), error will appear. So even if prereq_id is defined as some integer, error will still appear because there is no course.id the prereq_id can associate with.

  # Tested hypothesis with #instructor below by creating an instance of Course and assigning instructor_id to a non-existent user.id (due to classname: :User). Returned "Validation failed: Instructor must exist".

  belongs_to :instructor,
  primary_key: :id,
  foreign_key: :instructor_id, # foreign_key so use "belongs_to"
  class_name: :User

end
