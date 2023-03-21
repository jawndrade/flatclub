class ClubsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    skip_before_action :authorize, only: [:index, :show, :create]

    def index
        clubs = Club.all
        render json: clubs, status: :ok
    end

    # def show
    #     clubs = Club.all
    #     render json: clubs, status: :ok
    # end

    def show
        club = Club.find(params[:id])
        render json: club, include: [:posts, :'posts.comments']
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

    def club_params
        params.permit(:name, :description, :topic)
    end

    def render_unprocessable_entity_response(error)
        render json: { errors: "Please fill out all required fields" }, status: :unprocessable_entity
    end
end
