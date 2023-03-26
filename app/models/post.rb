class Post < ApplicationRecord
  belongs_to :club
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, :body, presence: true
  validates :title, length: { in: 3..100}

end
