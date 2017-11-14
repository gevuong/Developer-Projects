# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Artwork.destroy_all
ArtworkShare.destroy_all
Comment.destroy_all
Like.destroy_all

u1 = User.create!(username: "George", email: 'george@gmail.com')
u2 = User.create!(username: "Galileo", email: 'galileo@gmail.com')
u3 = User.create!(username: "Copernicus", email: 'copernicus@gmail.com')

artwork1 = Artwork.create!(title: 'nighthawks', image_url: 'google.com', artist_id: u1.id)
artwork2 = Artwork.create!(title: 'mona lisa', image_url: 'google1.com', artist_id: u2.id)

ArtworkShare.create!(artwork_id: artwork1.id, viewer_id: u2.id)
ArtworkShare.create!(artwork_id: artwork2.id, viewer_id: u3.id)

comment1 = Comment.create!(body: 'great!', user_id: u1.id, artwork_id: artwork1.id)
comment2 = Comment.create!(body: 'another great one', user_id: u2.id, artwork_id: artwork2.id)

Like.create!(user_id: u1.id, likeable_id: comment1.id, likeable_type: 'Comment')
Like.create!(user_id: u2.id, likeable_id: artwork2.id, likeable_type: 'Artwork')
Like.create!(user_id: u1.id, likeable_id: artwork2.id, likeable_type: 'Artwork')
Like.create!(user_id: u3.id, likeable_id: comment1.id, likeable_type: 'Comment')
