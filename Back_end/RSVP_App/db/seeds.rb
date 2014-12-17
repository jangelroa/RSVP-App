# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(firstname:"Angel", lastname:"Roa", email:"jangelroa@gmail.com", username:"jangelroa", password:"a")
User.create(firstname:"Sandi", lastname:"Ma", email:"sandima@gmail.com", username:"sandima", password:"s")

Event.create(title:"GA graduation party", public_description:"We are going to celebrate we finish and graduate the GA WDI program", private_description:"private_description", location:"225 Bush st, San Francisco", price:0, max_attendances:500, private_code:"2b4e7051414a49543e54158c96748ba5", event_picture_url:"http://crossfitcsa.com/wp-content/blogs.dir/35/files/2014/01/party-wod.jpeg", publico:false, user_id:1)

Event.create(title:"GA photo shoot", public_description:"We are going to take pictures of all of your faces GA WDI students", private_description:"private_description", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803b", event_picture_url: "http://donate.torreypinesfoundation.org/item_images/1410033807.jpg", publico: true, user_id: 2)

Event.create(title:"New Years Eve Party!", public_description:"New Years Eve : Night of Debauchery!", private_description:" private_description", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"2b4e7051414a49543e54158c96748ba4", event_picture_url: "http://www.whybevein.com/images/legs-promis.jpg", publico: false, user_id: 3)

Event.create(title:"Naughty Xmas Party", public_description:"Naughty Santa and his elves...", private_description:"private_description", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803c", event_picture_url: "http://www.nonverbal-magazine.com/wp-content/uploads/2014/08/Red-Abstract-Lips-Million-410139.jpg", publico: true, user_id: 4)


Attendance.create(user_id:1, event_id:1)
Attendance.create(user_id:2, event_id:2)
Attendance.create(user_id:1, event_id:3)
Attendance.create(user_id:2, event_id:4)