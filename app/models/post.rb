class Post < ApplicationRecord
    belongs_to :user
    belongs_to :challenge
    has_many :comments
    has_many :likes, dependent: :destroy # Second part makes sure that when you delete a post/user, all their likes get deleted.
end
