class CommentsController < ApplicationController
  #index, to test in postman, need to pass in query string params to work
  def index
    if comment_params[:user_id]
      comments = Comment.where(user_id: comment_params[:user_id])
    elsif comment_params[:artwork_id]
      comments = Comment.where(artwork_id: comment_params[:artwork_id])
    else
      comments = Comment.all
    end
    render json: comments
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment, status: :created
    else
      render json: comment.errors.full_messages, status: 422
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: comment
  end

  private
  def comment_params
    # params is hash-like object that includes helper methods(i.e .require, .permit)
    params.require(:comment).permit(:body, :user_id, :artwork_id)
  end

end
