class PostsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorize, only: [:index, :show, :destroy]

    def index
        posts = Post.all
        render json: posts, status: :ok
    end

    def show
        post = find_post
        render json: post, status: :ok
    end

    def create
        post = Post.create!(post_params)
        render json: post, status: :created
    end

    def destroy
        post = find_post
        post.destroy!
        head :no_content
    end

    private
    
    def find_post
        Post.find(params[:id])
    end

    def post_params
        params.permit(:title, :body, :user_id, :club_id)
    end

    # def creator_post_params(post)
    #     params.permit(:user_id, :post_id).with_defaults(user_id: session[:user_id], post_id: post.id)
    # end

    def render_unprocessable_entity_response(error)
        render json: { errors: "Please fill out all required fields" }, status: :unprocessable_entity
    end

end
