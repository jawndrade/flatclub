class Club < ApplicationRecord
    has_many :comments
    has_many :users, through: :memberships
    has_many :posts

    validates :topic, :name, presence: true

end
