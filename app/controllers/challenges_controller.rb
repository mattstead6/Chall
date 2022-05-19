class ChallengesController < ApplicationController


    def create
       challenge = Challenge.create(challenge_params)
       render json: challenge
    end


    private

    def challenge_params
        params.permit(:video, :challenge_description, :user_id)
    end
end
