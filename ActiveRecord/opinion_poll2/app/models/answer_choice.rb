# == Schema Information
#
# Table name: answer_choices
#
#  id          :integer          not null, primary key
#  text        :string           not null
#  question_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class AnswerChoice < ApplicationRecord
  validates :text, :question_id, presence: true
  # N.B. Remember, Rails 5 automatically validates presence of 'belongs_to' associations, so we can leave out validation of :question

  # Remember, "belongs_to" is a class method where first arg is name of association instance method, and second arg is an options hash
  belongs_to :question,
  primary_key: :id,
  foreign_key: :question_id,
  class_name: :Question

  # Remember, "has_many" is a class method where first arg is name of association instance method, and second arg is an options hash.
  has_many :responses,
  primary_key: :id,
  foreign_key: :answer_choice_id,
  class_name: :Response,
  dependent: :destroy
end
