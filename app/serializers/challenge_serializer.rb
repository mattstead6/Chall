class ChallengeSerializer < ActiveModel::Serializer
  attributes :id, :challenge_description, :video, :post_description
end
