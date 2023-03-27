class CommentsController < ApplicationController
    skip_before_action :authorize

    def index
        comments = Comment.all
        render json: comments.as_json(include: :user)
    end
    
    def create
        comment = Comment.new(comment_params)
        if comment.save
            render json: comment, status: :created
        else
            render json: comment.errors, status: :unprocessable_entity
        end
    end
    
    def destroy
        comment = @post.comments.find(params[:id])
        comment.destroy!
        head :no_content
    end
    
    private
    
    def comment_params
        params.permit(:content, :user_id, :post_id)
    end
    
end
