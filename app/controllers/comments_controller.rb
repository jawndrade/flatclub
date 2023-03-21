class CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorize, only: [:index, :show, :create, :destroy]

    # def index
    #     comments = Comment.all
    #     render json: comments, status: :ok
    # end

    def index
        post = Post.find(params[:post_id])
        comments = post.comments
        render json: comments
    end

    def show
        # comments = Comment.all
        # render json: comments, status: :ok
        post = Post.find(params[:post_id])
        comments = post.comments
        render json: comments
    end

    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy!
        head :no_content
    end

    private

    def comment_params
        params.permit(:post_id, :user_id, :content)
    end

    def render_unprocessable_entity_response(error)
        render json: { errors: "Please fill out all required fields" }, status: :unprocessable_entity
    end
    
end
