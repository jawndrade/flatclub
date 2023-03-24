class PostsController < ApplicationController
  skip_before_action :authorize

  def index
    club = Club.find(params[:club_id])
    posts = club.posts
    render json: posts
  end

  def show
    @post = Post.find(params[:id])
    @comments = @post.comments.includes(:user).order(created_at: :asc)
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
  end

  private
 
    def post_params
      params.require(:post).permit(:title, :body, :user_id, :club_id)
    end

end