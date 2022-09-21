class FollowsController < ApplicationController

    def index 
        follow = Follow.all
        render json: follow
    end

    def show
        follow = Follow.find(params[:id])
        render json: follow
    end

# POST /follows
    def create
        newFollow = Follow.create(follow_params)
        render json: newFollow
    end

    private

    def follow_params
        params.permit(:follower_id, :followed_user_id)
    end

end
