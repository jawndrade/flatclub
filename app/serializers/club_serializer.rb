class ClubSerializer < ActiveModel::Serializer
  attributes :id, :description, :topic
  has_many :posts
  has_many :users
end
