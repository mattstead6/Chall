class Challenge < ApplicationRecord
    has_many :posts
    belongs_to :user
    validates :challenge_description, presence: true
    validates :challenge_name, presence: true, uniqueness: true
    validates :video, presence: true 
    # do same on back end
end
 