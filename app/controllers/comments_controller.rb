class CommentsController < ApplicationController
    skip_before_action :authorize

    def index
        comments = Comment.all
        render json: comments.as_json(include: :user)
    end

    def show_all
        post = Post.find_by!(id: params[:post_id])
        c post.comments, status: :ok
    end
    
    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
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
