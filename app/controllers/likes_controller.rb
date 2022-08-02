class LikesController < ApplicationController


    def create
        # make sure to only create if not already made
        like = Like.create!(like_params)
        render json: like
    end

    def by_post_id
        post = Post.find(params[:post_id])
        render json: post.likes
    end

    def destroy
        like = Like.find(params[:id])
        like.delete
        head :no_content
    end

    private

    def like_params
        params.permit(:post_id, :user_id)
    end
end
