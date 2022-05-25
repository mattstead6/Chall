class ChallengesController < ApplicationController

    def show
        challenge = Challenge.find(params[:id])
        render json: challenge
    end

    def index
        challenges = Challenge.all
        render json: challenges
    end

    def create
        params[:user_id] = session[:user_id]
       challenge = Challenge.create!(challenge_params)
       render json: challenge
    end


    private

    def challenge_params
        params.permit(:video, :challenge_description, :user_id, :category, :id, :challenge_name)
    end
end
