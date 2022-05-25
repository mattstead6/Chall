class FollowsController < ApplicationController

def create
    newFollow = Follow.create(follow_params)
    render json :newFollow
end

private

def follow_params
    params.permit(:follower_id, followed_user_id)
end

end
