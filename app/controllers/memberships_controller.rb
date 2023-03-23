class MembershipsController < ApplicationController
    def index
        @memberships = Membership.all
        render json: @memberships
    end
    
    def create
        membership = Membership.new(membership_params)
        if membership.save
          render json: { message: 'Membership created successfully' }, status: :created
        else
          if membership.errors[:user_id].include?("has already been taken")
            render json: { error: "You're already a member of this club" }, status: :conflict
          else
            render json: { error: 'Failed to create membership' }, status: :unprocessable_entity
        end
      end
    end

    private
  
    def membership_params
      params.permit(:user_id, :club_id)
    end

end
