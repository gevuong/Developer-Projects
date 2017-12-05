# == Schema Information
#
# Table name: responses
#
#  id               :integer          not null, primary key
#  respondent_id    :integer          not null
#  answer_choice_id :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Response < ApplicationRecord
  validates :respondent_id, :answer_choice_id, presence: true
  # N.B. Remember, Rails 5 automatically validates presence of 'belongs_to' associations, so we can leave out validation of :answer_choice and :respondent

  # Only run custom validation if there is an answer_choice that exists
  # (otherwise this validation raises an error)
  validate :not_duplicate_response, unless: -> { answer_choice.nil? }

  # If answer_choice existence isn't checked, we will incorrectly get an error
  # "Respondent cannot be poll author" when no repondent is provided,
  # or won't have an error when we set respondent to the poll author
  # until a answer_choice is set
  validate :respondent_is_poll_author?, unless: -> { answer_choice.nil? }

  # Remember, "belongs_to" is a class method where first argument is name of association instance method, and second argument is an options hash.
  belongs_to :respondent,
  primary_key: :id,
  foreign_key: :respondent_id,
  class_name: :User

  belongs_to :answer_choice,
  primary_key: :id,
  foreign_key: :answer_choice_id,
  class_name: :AnswerChoice

  # works exactly like has_many through:, except it returns a single object (or nil) instead of an array (or empty array)
  has_one :question,
  through: :answer_choice,
  source: :question

  # Due to SQL ternary logic (meaning a conditional statement can evaluate to TRUE, FALSE, or NULL), chain a where.not clause to filter out current response.

  # returns all other response objects to question. We only want sibling responses, so single out current response w/ self.id.
  def sibling_responses
    # 2-query way (1-query way can be done writing SQL commands in ruby)
    self.question.responses.where.not(id: self.id)
  end

  # checks to see if any sibling responses exist with the same respondent_id. If there is, then respondent (or user) instance has already answered the question.
  def respondent_already_answered?
    sibling_responses.exists?(respondent_id: self.respondent.id)
  end

  # custom validation method to ensure that respondent has not already answered to same question.
  def not_duplicate_response
    # errors[:base] returns an array, shovel a string to create error message
    errors[:respondent_id] << 'cannot vote twice for question' if respondent_already_answered?
  end

  def respondent_is_poll_author?
    # 2-query way (slower, writing ActiveRecord queries will be 1-query)
    # errors[:base] returns an array, shovel a string to create error message
    errors[:respondent_id] << 'cannot be poll author' if question.poll.author_id == respondent.id
  end
end
