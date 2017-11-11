# == Schema Information
#
# Table name: enrollments
#
#  id         :integer          not null, primary key
#  student_id :integer          not null
#  course_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Enrollment < ApplicationRecord
  validates :student_id, :course_id, presence: true

  # Remember, "belongs_to" is a class method where the first arg is name of association instance method, and second arg is an options hash.
  belongs_to :student,
  primary_key: :id,
  foreign_key: :student_id,
  class_name: :User

  belongs_to :course,
  primary_key: :id,
  foreign_key: :course_id,
  class_name: :Course
end

# These instance methods allow you to execute Enrollment.first.student and Enrollment.first.course.

# A "belongs_to" sets up a connection that will fetch and return a SINGLE associated object. Use a belongs_to when object has a foreign_key that points to associated record.

# The belongs_to and has_many methods exist in a module named ActiveRecord::Associations::ClassMethods. ActiveRecord::Base extends this module, so the association methods are available as class methods. These class methods define instance methods (#student, #course).
