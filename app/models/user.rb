class User < ApplicationRecord
    has_secure_password
    has_many :memberships, dependent: :destroy
    has_many :clubs, through: :memberships
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy

    validates :username, :password, :first_name, :last_name, presence: true, length: { in: 3..30 }
    validates_uniqueness_of :username, message: "is invalid"

end
