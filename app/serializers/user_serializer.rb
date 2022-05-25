class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :bio, :profile_pic, :name
  has_many :posts
end
