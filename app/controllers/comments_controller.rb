class CommentsController < ApplicationController

    def index
        comments = Comment.all 
        render json: comments
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment
    end

    def create
        comment = Comment.create!(commment_params)
        render json: comment
    end

    def delete
        comment = Comment.find(params[:id])
        comment.destroy
        head :no_content
    end

    def by_post_id
        post = Post.find(params[:post_id])
        render json: post.comments
    end

    private

    def commment_params
        params.permit(:actual_comment, :user_id, :post_id)
    end
    
end

