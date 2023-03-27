class CommentsController < ApplicationController
    skip_before_action :authorize

    def index
        comments = @post.comments
        render json: comments.as_json(include: :user)
    end
    
    def create
        comment = @post.comments.new(comment_params.merge(user_id: current_user.id))
        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
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
