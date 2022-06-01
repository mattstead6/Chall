class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :actual_comment
  belongs_to :user
end
