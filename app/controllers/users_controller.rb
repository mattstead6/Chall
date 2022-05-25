class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users
    end





    # STAYING LOGGED IN

    # def show
    #     user = User.find_by(id: session[:user_id])
    #     if user
    #       render json: user
    #     else
    #       render json: { error: "Not authorized" }, status: :unauthorized
    #     end
    #   end

    def show
        user = User.find(params[:id])
        render json: user
    end

    # SIGNING UP

    def create
       user = User.create!(user_params)
       session[:user_id] = user.id
       render json: user, status: :created
    end
    
    ## SAVING


    private

    # PARAMS FOR SIGNING UP

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
