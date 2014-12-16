# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(firstname:"Angel", lastname:"Roa", email:"jangelroa@gmail.com", username:"jangelroa", password:"a")
User.create(firstname:"Sandi", lastname:"Ma", email:"sandima@gmail.com", username:"sandima", password:"s")

Event.create(title:"GA graduation party", public_description:"We are going to celebrate we finish and graduate the GA WDI program", private_description:"private_description", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"2b4e7051414a49543e54158c96748ba5", publico: false, user_id: 1)

