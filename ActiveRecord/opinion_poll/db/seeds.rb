# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Poll.destroy_all
Question.destroy_all
AnswerChoice.destroy_all
Response.destroy_all

u1 = User.create!(username: 'Markov')
u2 = User.create!(username: 'Gizmo')

# You can take out .id or _id and it still works...(does not work in rails c)
# For example,
# p1 = Poll.create!(author_id: u1.id, title: 'programming language')
# q1 = Question.create!(poll_id: p1.id, text: 'Your fav programming language?')
# ac11 = AnswerChoice.create!(question_id: q1.id, text: 'Ruby')
# r1 = Response.create!(respondent_id: u1.id, answer_choice_id: ac11.id)

p1 = Poll.create!(author: u1, title: 'programming language')

q1 = Question.create!(poll: p1, text: 'Your fav programming language?');

ac11 = AnswerChoice.create!(question: q1, text: 'Ruby')
ac12 = AnswerChoice.create!(question: q1, text: 'JavaScript')
ac13 = AnswerChoice.create!(question: q1, text: 'Python')

q2 = Question.create!(poll: p1, text: 'Your least favorite language?')
ac21 = AnswerChoice.create!(question: q2, text: 'Java')
ac22 = AnswerChoice.create!(question: q2, text: 'PHP')
ac23 = AnswerChoice.create!(question: q2, text: 'Go')

r1 = Response.create!(respondent: u1, answer_choice: ac11)
r1 = Response.create!(respondent: u1, answer_choice: ac23)

r2 = Response.create!(respondent: u2, answer_choice: ac13)
r2 = Response.create!(respondent: u2, answer_choice: ac21)
