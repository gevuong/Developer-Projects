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
end
