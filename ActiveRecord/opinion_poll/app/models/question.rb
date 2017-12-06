# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  text       :string           not null
#  poll_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ApplicationRecord
  validates :poll_id, :text, presence: true
  # N.B. Remember, Rails 5 automatically validates presence of 'belongs_to' associations, so we can leave out validation of :poll

  # Remember, "belongs_to" is a class method where first argument is name of association instance method, and second argument is an options hash.
  belongs_to :poll,
  primary_key: :id,
  foreign_key: :poll_id,
  class_name: :Poll

  # Remember, "has_many" is a class method where first arg is name of association instance method, and second arg is an options hash.
  has_many :answer_choices,
  primary_key: :id,
  foreign_key: :question_id,
  class_name: :AnswerChoice,
  dependent: :destroy

  has_many :responses,
  through: :answer_choices,
  source: :responses

  # #results returns a hash of choices and counts

  # N+1 query method (not efficient - first query fetches all answer choices from question. N queries is based on number of choices for that question. If there were 10,000 choices, there would be 10,0000 queries):
  def results_n_plus_1
    results = {}
    choices = self.answer_choices
    choices.each { |choice| results[choice.text] = choice.responses.count }

    results
  end

  # #includes pre-fetches data, and doesnt change object type returned (Executes just 2 queries. When there are many answer choices, this is a major win)
  def results_2_queries
    choices = self.answer_choices.includes(:responses)
    results = {}

    # NB: if we write `choice.responses.count` ActiveRecord will try to
    # be super-smart and run a `SELECT COUNT(*) FROM responses WHERE
    # responses.answer_choice_id = ?` query. This is because ActiveRecord
    # understands `#count`. But we already fetched the responses and
    # don't want to go back to the DB, so we can avoid this behavior
    # by calling `Array#length`
    choices.each { |choice| results[choice.text] = choice.responses.length }

    results
  end

  # 1-query way all SQL. #includes is not the most ideal because it causes all responses to transfer to the client even though we only want to count the number of them. This is wasteful. Improved Solution
  def results_1_query_SQL
    acs = AnswerChoice.find_by_sql([<<-SQL, id])
      SELECT
        answer_choices.text, COUNT(responses.id) AS num_responses
      FROM
        answer_choices
        LEFT OUTER JOIN responses
          ON answer_choices.id = responses.answer_choice_id
      WHERE
        answer_choices.question_id = ?
      GROUP BY
        answer_choices.id
    SQL

    acs.inject({}) do |results, answer_choice|
      results[answer_choice.text] = answer_choice.num_responses
      results
    end
  end

  # 1-query with ActiveRecord (less efficient solutions are shown above)
  def results
    acs = self.answer_choices
      .select("answer_choices.text, COUNT(responses.id) AS num_responses")
      .left_outer_joins(:responses)
      .group("answer_choices.id")

    acs.inject({}) do |results, answer_choice|
      results[answer_choice.text] = answer_choice.num_responses
      results
    end
  end

end
