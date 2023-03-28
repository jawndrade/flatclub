class ClubSerializer < ActiveModel::Serializer
  attributes :id, :description, :topic, :posts, :users
  # has_many :posts
  # has_many :users
  # has_many :comments, through :posts
  def posts
    object.posts.map do |post| {
      id: post.id,
      title: post.title,
      body: post.body,
      user_id: post.user.id,
      comments: post.comments.map do |comment|
        {
          content: comment.content,
          username: comment.user.username
        }
      end
    }
    end
  end
end