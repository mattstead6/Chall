
Post.destroy_all
User.destroy_all
Challenge.destroy_all

User.create(name: "Niall Horan", username: "Niall", password_digest: "nia", bio: "unreal singer", profile_pic: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2019%2F07%2Fgettyimages-1128872973-2000.jpg&q=60")
User.create(name: "Steph Curry", username: "Steph", password_digest: "ste", bio: "3 point god", profile_pic: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254")
User.create(name: "Alfonso Ribiero", username: "Alfonso", password_digest: "alf", bio: "Carlton from Fresh Prince", profile_pic: 'https://m.media-amazon.com/images/M/MV5BNTAzNzA3MTA4MV5BMl5BanBnXkFtZTcwNDgxODk1OQ@@._V1_.jpg')
User.create(name: "Blaire O'Neal", username: "Blaire", password_digest: "bla", bio: "Your favorite golfer and model", profile_pic: 'https://www.golfchannel.com/sites/default/files/styles/full/public/2015/09/09/090815_schoolofgolf_165.jpg?itok=kw0biwZ_')


Challenge.create(user_id: 1, video: "https://res.cloudinary.com/dgx9mftel/video/upload/v1652982339/c7lkpjz4bdqp6bgwxmwx.mp4", challenge_description: "I'm starting this challenge to help with the ALS Foundation. You pour ice cold water on your head and donate to the charity")
Challenge.create(user_id: 4, video: "https://res.cloudinary.com/dgx9mftel/video/upload/v1652982639/z3vzoknfao10unqq0d38.mp4", challenge_description: "I'm starting this golf challenge! See if you can break a foot by foot glass with a 9 iron from 20 yards away.")


Post.create(user_id: 1, challenge_id:1, caption: "this water was colllddd", video:"https://res.cloudinary.com/dgx9mftel/video/upload/v1652973699/gyab8tv7wnjmeft8upp7.mov")
Post.create(user_id: 2, challenge_id:2, caption: "im a hooper and a golfer these days", video:"https://res.cloudinary.com/dgx9mftel/video/upload/v1652982639/z3vzoknfao10unqq0d38.mp4")
Post.create(user_id: 3, challenge_id:2, caption: "I'm number 1 as usual", video:"https://res.cloudinary.com/dgx9mftel/video/upload/v1652986074/sevey7xw8wqwcy7vtdqn.mp4")
Post.create(user_id: 4, challenge_id:2, caption: "Did not quite go as planned", video:"https://res.cloudinary.com/dgx9mftel/video/upload/v1652986716/flangf5rzxpt9fzwgcwe.mp4")



puts "success!!"
# create_table "challenges", force: :cascade do |t|
#     t.string "video"
#     t.string "challenge_description"
#     t.integer "user_id"
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#   end

#   create_table "posts", force: :cascade do |t|
#     t.integer "user_id"
#     t.integer "challenge_id"
#     t.string "caption"
#     t.string "video"
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#   end

#   create_table "users", force: :cascade do |t|
#     t.string "username"
#     t.string "password_digest"
#     t.string "bio"
#     t.string "profile_pic"
#     t.string "name"