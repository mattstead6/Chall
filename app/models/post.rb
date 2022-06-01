class Post < ApplicationRecord
    belongs_to :user
    belongs_to :challenge
    has_many :comments
    has_many :likes
end
