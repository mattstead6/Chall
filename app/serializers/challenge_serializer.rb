class ChallengeSerializer < ActiveModel::Serializer
  attributes :id, :challenge_description, :video, :user_id, :category, :challenge_name
  belongs_to :user
end
