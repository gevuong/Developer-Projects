# == Schema Information
#
# Table name: courses
#
#  id            :integer          not null, primary key
#  name          :string           not null
#  prereq_id     :integer
#  instructor_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Course < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  # validates :prereq_id, presence: true # this line actually prevents rails db:seed to execute and store data in DB because seeded data is missing prereq_id.

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
  foreign_key: :prereq_id,    # foreign_key uses belongs_to
  class_name: :Course   # class does not exist, but if it did exist

  belongs_to :instructor,
  primary_key: :id,
  foreign_key: :instructor_id, # foreign_key uses belongs_to
  class_name: :User

end
