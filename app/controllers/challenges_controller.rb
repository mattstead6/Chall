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

    # def create
    #     params[:user_id] = session[:user_id]
    #     ActiveRecord::base.transaction do
    #         challenge = Challenge.create!(challenge_params)
    #         @post  = Post.create!(post_params)
    #     end
    #     render json: @post
    # end


    private

    def challenge_params
        params.permit(:video, :challenge_description, :user_id, :category, :id, :challenge_name)
    end

    # def post_params
    #     params.permit(:video, :caption, :category, :challenge_description, :challenge_name, :user_id, :challenge_id)
    # end
end


