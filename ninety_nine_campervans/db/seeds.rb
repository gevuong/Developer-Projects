# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Campervan.destroy_all
CampervanRentalRequest.destroy_all

u1 = Campervan.create!(name: 'Salamander', year: 1999, make: 'Plymouth', model: 'Caravan', color: 'rainbow', mileage: 250000, description: '7 passengers, auto transmission')
u2 = Campervan.create!(name: 'Hondie', year: 2003, make: 'Honda', model: 'Odyssey', color: 'white', mileage: 25000, description: '5 passengers, leather seats')
u3 = Campervan.create!(name: 'Thundercat', year: 2005, make: 'BMW', model: 'X5', color: 'blue', mileage: 135000, description: '6 passengers, air conditioning')

CampervanRentalRequest.create!(start_date: Date.new(2001,2,3), end_date: Date.new(2001,2,5), campervan_id: u1.id, status: "PENDING")
CampervanRentalRequest.create!(start_date: Date.new(2001,4,3), end_date: Date.new(2001,4,28), campervan_id: u2.id, status: "PENDING")
CampervanRentalRequest.create!(start_date: Date.new(2001,3,3), end_date: Date.new(2001,3,8), campervan_id: u3.id, status: "PENDING")
