class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :bio, :profile_pic, :name, :followers_count, :following_count
  has_many :posts
  has_many :followings
  
  def followers_count
    object.followers.count
  end

  def following_count
    object.followings.count
  end
  
end
