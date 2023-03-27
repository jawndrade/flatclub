class ClubSerializer < ActiveModel::Serializer
  attributes :id, :description, :topic
  has_many :posts
  has_many :users
  # has_many :comments, through :posts
end