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

  # Remember, "has_many" is a class method where the first argument is
  # the name of the association instance method, and the second argument is an options
  # hash.
  has_many :enrollments,
  primary_key: :id,
  foreign_key: :course_id,
  class_name: :Enrollment

  has_many :enrolled_students,
  through: :enrollments,
  source: :student
  #student instance method specified in class Enrollment, must be lowercase

  # Remember, "belongs_to" is a class method where the first argument is
  # the name of the association instance method, and the second argument is an options
  # hash.
  belongs_to :prerequisite,
  primary_key: :id,
  foreign_key: :prereq_id,    # foreign_key so use "belongs_to"
  class_name: :Course,
  optional: true # without this line, returns "Validation failed: Prerequisite must exist". Apparently, Rails cannot validate an instance method where the value of class_name is the class the #prerequisite instance method is defined in. Instead, Rails assumes there is a class Prerequisite that needs to be associated with #prerequisite.

  # Tested hypothesis with #instructor below by changing class_name: :Course. Returned "Validation failed: Instructor must exist".

  belongs_to :instructor,
  primary_key: :id,
  foreign_key: :instructor_id, # foreign_key so use "belongs_to"
  class_name: :User

end
