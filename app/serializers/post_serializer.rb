class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :challenge_id, :caption, :video, :category
  belongs_to :user
end
