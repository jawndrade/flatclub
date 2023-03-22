class PostsController < ApplicationController

  def index
    club = Club.find(params[:club_id])
    posts = club.posts
    render json: posts
  end

  def show
    @post = Post.find(params[:id])
    @comments = @post.comments.includes(:user).order(created_at: :asc)
  end

end