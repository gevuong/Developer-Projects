class ArtworksController < ApplicationController
  #index should return the artwork owned by user and shared with user
  def index
    # params[:user_id] comes from route parameters (:user_id wildcard)
    render json: Artwork.artworks_for_user_id(params[:user_id]) # 1-query way

  # 3-query method I initially came up with
    # if params.has_key?(:user_id)
    #   artworks = Artwork.where(artist_id: params[:user_id])
    #   artworks_shared = User.find(params[:user_id]).shared_artworks
    #   render json: (artworks + artworks_shared).uniq
    # else
    #   render json: "unprocessable entity"
    # end
  end

  def show
    render json: Artwork.find(params[:id])
  end

  def create
    artwork = Artwork.new(artwork_params)
    if artwork.save
      render json: artwork, status: :created # status: 201 created
    else
      render json: artwork.errors.full_messages, status: 422
    end
  end

  def update
    artwork = Artwork.find(params[:id])

    if artwork.update(artwork_params)
      render json: artwork
    else
      render json: artwork.errors.full_messages, status: 422
    end
  end

  def destroy
    artwork = Artwork.find(params[:id])
    artwork.destroy
    render json: artwork
  end

  private
  # use strong params by writing helper method that whitelists Artwork attributes
  def artwork_params
    params.require(:artwork).permit(:title, :image_url, :artist_id)
  end
end
