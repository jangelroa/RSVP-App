# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(firstname:"Angel", lastname:"Roa", email:"jangelroa@gmail.com", username:"jangelroa", password:"a")
User.create(firstname:"Sandi", lastname:"Ma", email:"sandima@gmail.com", username:"sandima", password:"s")

Event.create(title:"GA graduation party", public_description:"We are going to celebrate our graduation from the GA WDI program", private_description:"private_description", location:"225 Bush st, San Francisco", price:0, max_attendances:500, private_code:"2b4e7051414a49543e54158c96748ba5", event_picture_url:"http://crossfitcsa.com/wp-content/blogs.dir/35/files/2014/01/party-wod.jpeg", publico:false, user_id:1)

Event.create(title:"GA photo shoot", public_description:"Picture time!", private_description:"private_description", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803b", event_picture_url: "http://donate.torreypinesfoundation.org/item_images/1410033807.jpg", publico: true, user_id: 2)

Event.create(title:"New Years Eve Party!", public_description:"New Years Eve : Night of Debauchery!", private_description:" private_description", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"2b4e7051414a49543e54158c96748ba4", event_picture_url: "http://www.whybevein.com/images/legs-promis.jpg", publico: false, user_id: 2)

Event.create(title:"Naughty Xmas Party", public_description:"Naughty Santa and his elves...", private_description:"private_description", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803c", event_picture_url: "http://www.nonverbal-magazine.com/wp-content/uploads/2014/08/Red-Abstract-Lips-Million-410139.jpg", publico: true, user_id: 1)

Event.create(title:"Naked Bicyclists- UNITE!", public_description:"Come one, come all, come naked! Bring your own bicycle.", private_description:"Come one, come all, come naked! Bring your own bicycle and leave your inhibitions at home.  ", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803c", event_picture_url: "http://cdn.funcheap.com/wp-content/uploads/2013/02/San-Francisco-California-Naked-cyclists-negotiate-the-hairpin-turns-of-Lombard-Street-600x4001.jpg", publico: true, user_id: 2)

Event.create(title:"Rave in SF! Hush...Hush...", public_description:"Bring on your late night raving animal..", private_description:"Bring cash, we will supply the drugs and alcohol.  Address to be announced 30 minutes before event.  Check the app for more details. ", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803c", event_picture_url: "http://www.getliftedtonight.com/wp-content/uploads/2013/10/IMG_6089.jpg", publico: true, user_id: 1)

Event.create(title:"Snugglepuss partay!!", public_description:"Guesses on what we will be doing?", private_description:"Yes beautiful people....we will cuddling, snuggling, canoodling, and whatever else your body desires.  Attire: none ", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803c", event_picture_url: "http://cdn04.cdn.socialitelife.com/wp-content/uploads/2011/12/cats-dogs-snuggling-12072011-33.jpg", publico: true, user_id: 2)

Event.create(title:"Shibari", public_description:"Red Rope.", private_description:"Leather, heels, dark makeup, sexy lace, whips.  Need I say more?  Details of the event to be posted the day of. Check back on the app ", location:"225 Bush st, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803c", event_picture_url: "http://data2.whicdn.com/images/102639217/large.jpg", publico: true, user_id: 2)


Event.create(title:"Happy Hour at GA ", public_description:"Bring it on!", private_description:"Bring on the alcohol!  We will be celebrating our graduation.", location:"225 Bush St, 18th floor, San Francisco", price: 0, max_attendances: 500, private_code:"68293e7d7efa30c74d3af809e745803c", event_picture_url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTPQXtSVaEpuIQruPRnIRS_WBUh8iriWpUOR1rlk-Mh5uYxh3XvMjpQMrnf", publico: true, user_id: 1)


Attendance.create(user_id:1, event_id:1)
Attendance.create(user_id:2, event_id:2)
Attendance.create(user_id:1, event_id:3)
Attendance.create(user_id:2, event_id:4)