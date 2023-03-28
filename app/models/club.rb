class Club < ApplicationRecord
    has_many :memberships
    has_many :users, through: :memberships
    has_many :posts
    has_many :comments, through: :posts, dependent: :destroy

    validates :topic, :name, presence: true

end
