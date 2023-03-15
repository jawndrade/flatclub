class User < ApplicationRecord
    has_secure_password
    has_many :memberships
    has_many :clubs, through: :memberships
    has_many :posts
    has_many :comments

    validates :username, :password, :first_name, :last_name, presence: true, length: { in: 3..30 }
    validates_uniqueness_of :username, message: "is invalid"

end
