class PostsController < ApplicationController
  skip_before_action :authorize

  def index
    posts = Post.all
    render json: posts, status: :ok
  end

  def show
    post = Post.find(params[:id])
    render json: post, serializer: PostSerializer, status: :ok
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