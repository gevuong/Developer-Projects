# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Campervan.destroy_all

Campervan.create!(name: 'Salamander', year: 1999, make: 'Dodge', model: 'Caravan', color: 'rainbow', mileage: 250000, description: '7 passengers, auto transmission')
