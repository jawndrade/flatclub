class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :created_at, :user
  has_one :club
  has_one :user
  has_many :comments
end
