class PostsController < ApplicationController

    def index
        posts = Post.all 
        render json: posts
    end

    def show
        post = Post.find(params[:id])
        render json: post
    end

    def create
        post = Post.create!(post_params)
        render json: post
    end

    def delete
        post = Post.find(params[:id])
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:video, :caption, :category, :challenge_description, :challenge_name, :user_id, :challenge_id)
    end
end
