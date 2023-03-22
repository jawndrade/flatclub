class CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorize
    # before_action :set_post

    # def index
    #     comments = @post.comments
    #     render json: comments.as_json(include: :user)
    #   end
    
    #   def create
    #     comment = @post.comments.create!(comment_params.merge(user_id: current_user.id))
    #     render json: comment, status: :created
    #   end
    
    #   def destroy
    #     comment = @post.comments.find(params[:id])
    #     comment.destroy!
    #     head :no_content
    #   end
    
    #   private
    
    #   def set_post
    #     @post = Post.find(params[:post_id])
    #   end
    
    #   def comment_params
    #     params.permit(:content)
    #   end
    
    #   def render_unprocessable_entity_response(error)
    #     render json: { errors: "Please fill out all required fields" }, status: :unprocessable_entity
    #   end
    
end
