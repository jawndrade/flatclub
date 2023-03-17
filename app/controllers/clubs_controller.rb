class ClubsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorize, only: [:index, :show, :create]

    def index
        clubs = Club.all
        render json: clubs, status: :ok
    end

    def show
        clubs = Club.all
        render json: clubs, status: :ok
    end

    def create
        club = Club.create!(club_params)
        render json: club, status: :created
    end

    def destroy
        club = Club.find(params[:id])
        club.destroy!
        head :no_content
    end

    private
    
    # def find_club
    #     Club.find(params[:id])
    # end

    def club_params
        params.permit(:name, :description, :topic)
    end

    # def creator_post_params(post)
    #     params.permit(:user_id, :post_id).with_defaults(user_id: session[:user_id], post_id: post.id)
    # end

    def render_unprocessable_entity_response(error)
        render json: { errors: "Please fill out all required fields" }, status: :unprocessable_entity
    end
end
