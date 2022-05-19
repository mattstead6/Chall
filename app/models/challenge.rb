class Challenge < ApplicationRecord
    has_many :posts
    belongs_to :user
    has_one_attached :video
    validates :challenge_description, presence: true
end
 