class Post < ApplicationRecord
  belongs_to :club, dependent: :destroy
  belongs_to :user, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :title, :body, presence: true
  validates :title, length: { in: 4..100}

end
