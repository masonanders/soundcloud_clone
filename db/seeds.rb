# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

demo_user = User.create(username: 'demo_user', password: 'iliketodemo', email: "demo@demo.com")

user_1 = User.create!(username: 'user_1', password: 'password', email: "user_1@soundwaves.com")
user_2 = User.create!(username: 'user_2', password: 'password', email: "user_2@soundwaves.com")
user_3 = User.create!(username: 'user_3', password: 'password', email: "user_3@soundwaves.com")