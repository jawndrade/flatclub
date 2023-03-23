class CommentsController < ApplicationController
    skip_before_action :authorize

    def index
        comments = @post.comments
        render json: comments.as_json(include: :user)
    end
    
    def create
        comment = @post.comments.create!(comment_params.merge(user_id: current_user.id))
        render json: comment, status: :created
    end
    
    def destroy
        comment = @post.comments.find(params[:id])
        comment.destroy!
        head :no_content
    end
    
    private
    
    def comment_params
        params.permit(:content)
    end
    
end
