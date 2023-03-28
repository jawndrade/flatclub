class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :created_at, :user, :post_comments, :comments
  # has_one :club
  # has_one :user
  # has_many :comments

  def post_comments
    object.comments.map do |comment| {
      content: comment.content,
      user_id: comment.user.id,
      user: comment.user.username,
      post_id: comment.post.id
    }
    end
  end

end
