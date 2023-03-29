class ClubSerializer < ActiveModel::Serializer
  attributes :id, :description, :topic, :posts, :users, :name

  def posts
    object.posts.map do |post| {
      id: post.id,
      title: post.title,
      body: post.body,
      user_id: post.user.id,
      created_at: post.created_at,
      comments: post.comments.map do |comment|
        {
          content: comment.content,
          username: comment.user.username,
          id: comment.id
        }
      end
    }
    end
  end
end