class Club < ApplicationRecord
    has_many :comments, dependent: :destroy
    has_many :memberships, dependent: :destroy
    has_many :users, through: :memberships
    has_many :posts, dependent: :destroy

    validates :topic, :name, presence: true

end
