# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "clearing the database..."
Club.destroy_all
Comment.destroy_all
Membership.destroy_all
Post.destroy_all
User.destroy_all

puts "seeding users..."
jess = User.create!(first_name: "Jess", last_name: "Andrade", username: "jawndrade", password: "abc123", image: "https://media.licdn.com/dms/image/C4D03AQENZA637QGm9A/profile-displayphoto-shrink_800_800/0/1529701152750?e=2147483647&v=beta&t=KBdaFT46owBay8DCAmnTVNpe6PxB5TQO7j4cF7fPPAU")
liza = User.create!(first_name: "Liza", last_name: "McLain", username: "lizer", password: "abc123", image: "https://media.licdn.com/dms/image/D4E03AQESUyotV0VOkA/profile-displayphoto-shrink_800_800/0/1673455257910?e=2147483647&v=beta&t=9OOaL_i-KWcmcjn34PwttOECB3cmkrLLil_f2YvBNbw")


puts "seeding clubs..."
react = Club.create!(description: "Your one-stop shop for all things React! This week's focus is on useContext.", topic: "React")
css = Club.create!(description: "All things CSS! Feel free to share any resources, hot-tips, or set up demos!", topic: "CSS")
active_record = Club.create!(description: "Active Record club always be bumpin'.", topic: "Active Record")

puts "seeding memberships..."
jess_css_membership = Membership.create!(user_id: jess.id, club_id: css.id)
liza_css_membership = Membership.create!(user_id: liza.id, club_id: css.id)

puts "seeding posts..."
css_post1 = Post.create!(club_id: css.id, user_id: jess.id, title: "Tailwind thots", body: "Ok so I'm finally getting around to playing with Tailwind and having so much fun so far! Bit of a learning curve, tho. Anyone have any hot tips or best practices?? Thanks!")
css_post2 = Post.create!(club_id: css.id, user_id: liza.id, title: "UUUUGHHH CSS", body: "CSS will be the death of me, what are some of the ways y'all have found for getting better at it?")

puts "seeding comments..."
css_comment1 = Comment.create!(post_id: css_post1.id, user_id: liza.id, content: "make sure to check out youtube!! i've found so many helpful tutorials on there")
css_comment2 = Comment.create!(post_id: css_post1.id, user_id: liza.id, content: "ahh and make sure to always have tailwind's documentation up while you're getting used to it!!")
css_comment3 = Comment.create!(post_id: css_post2.id, user_id: jess.id, content: "SAME THO. i still haven't found any life-changing tips, sadly it def still feels like trial and error for me lol")

puts "seeding complete!!!"
