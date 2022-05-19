class User < ApplicationRecord
    has_many :posts
    has_many :challenges 
    has_secure_password
    validates :username, presence: true, uniqueness: true
end
