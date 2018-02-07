# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

george = User.create(
  first_name: "George",
  last_name: "Vuong",
  email: "george@gmail.com",
  password: "password"
)

josh = User.create(
  first_name: "Josh",
  last_name: "Chen",
  email: "josh@gmail.com",
  password: "password"
)

Business.destroy_all

gary_danko = Business.create(
  user_id: george.id,
  name: "Gary Danko",
  category: "restaurant",
  latitude: 37.80587,
  longitude: -122.42058,
  street_address: "800 N Point St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94109",
  image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/--8oiPVp0AsjoWHqaY1rDQ/o.jpg",
  url: "https://www.yelp.com/biz/gary-danko-san-francisco",
  phone: "+14152520800",
  hours: ["Mon 9a-10p"]
)

joys_place = Business.create(
  user_id: josh.id,
  name: "joys_place",
  category: "restaurant",
  latitude: 47.80587,
  longitude: -112.42058,
  street_address: "575 Post St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94103",
  image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/--8oiPVp0AsjoWHqaY1rDQ/o.jpg",
  url: "https://www.yelp.com/biz/gary-danko-san-francisco",
  phone: "+14152520822",
  hours: ["Mon 9a-10p"]
)

WaitlistItem.destroy_all

steve = WaitlistItem.create(
  business_id: gary_danko.id,
  name: "Steve",
  size: 2,
  notes: "VIP",
  status: "WAITING",
  phone: "+14152520945"
)

dave = WaitlistItem.create(
  business_id: joys_place.id,
  name: "Dave",
  size: 5,
  notes: "2 kids",
  status: "WAITING",
  phone: "+14152520824"
)
# 
# dave = WaitlistItem.update(
#   business_id: joys_place.id,
#   name: "Dave",
#   size: 5,
#   notes: "2 kids",
#   status: "SEEDED",
#   phone: "+14152520824"
# )
