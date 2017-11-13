class CommentsController < ApplicationController

  def index
    render json: Comment.all
  end

  def create

  end

  def destroy

  end

  private
  def comment_params
    params.require(:comment).permit(:body, :artist_id, :artwork_id)
  end

end
