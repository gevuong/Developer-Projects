class ArtworkSharesController < ApplicationController
  def index
    render json: ArtworkShare.all
  end

  def create
    artwork_share = ArtworkShare.new(artwork_share_params)
    if artwork_share.save
      render json: artwork_share
    else
      render json: artwork_share.errors.full_messages, status: 422
    end
  end

  # unshares an artwork with a user
  def destroy
    artwork_share = ArtworkShare.find(params[:id])
    if artwork_share.destroy
      render json: artwork_share
    else
      render json: artwork.share.errors.full_messages, status: 422
    end
  end

  private
  # use strong params by writing helper method that whitelists ArtworkShare attributes
  def artwork_share_params
    params.require(:artwork_share).permit(:artwork_id, :viewer_id)
  end
end
