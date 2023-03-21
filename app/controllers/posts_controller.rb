cclass PostsController < ApplicationController
def index
  club = Club.find(params[:club_id])
  posts = club.posts
  render json: posts
end
end