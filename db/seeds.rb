puts "Seeding users..."

eli = User.create(username: "elidcraig", email: "elidcraig@gmail.com", password: "1234")
byrnese = User.create(username: "byrnese.elizabeth", email: "byrnese.craig@gmail.com", password: "1234")
25.times do
  User.create(Faker::Internet.user('username', 'email', 'password'))
end

puts "Seeding meals..."

eli.meals.create(name: "Pasta & Sauce", prep_time: 30)
eli.meals.create(name: "Fried Rice", prep_time: 30)
eli.meals.create(name: "Quesadillas", prep_time: 30)
eli.meals.create(name: "Biscuits & Gravy", prep_time: 30)
eli.meals.create(name: "Monte Cristo", prep_time: 30)
eli.meals.create(name: "Fish Tacos", prep_time: 30)
byrnese.meals.create(name: "Potato Soup", prep_time: 30)
byrnese.meals.create(name: "French Onion Soup", prep_time: 30)
byrnese.meals.create(name: "Lentil Sloppy Joes", prep_time: 30)
byrnese.meals.create(name: "Homemade Pizza", prep_time: 30)
byrnese.meals.create(name: "BLT", prep_time: 30)
byrnese.meals.create(name: "Ravioli", prep_time: 30)
byrnese.meals.create(name: "Stuffed Bell Peppers", prep_time: 30)
byrnese.meals.create(name: "Enchiladas", prep_time: 30)
byrnese.meals.create(name: "Honey Sriracha Chicken", prep_time: 30)
byrnese.meals.create(name: "Goulash", prep_time: 30)
byrnese.meals.create(name: "Baked Haddock", prep_time: 30)

puts "Done!"