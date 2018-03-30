class ArtistsController < ApplicationController
    def create
        artist = Artist.new(artist_params)
        if artist.save
            redirect_to artist_url(artist) # artist show page
        else
            flash.now[:errors] = artist.errors.full_messages
            render :new
        end
    end

    def new
    end

    def index
        @artists = Artist.all
    end

    def show
        @artist = Artist.find_by_id(params[:id])
    end

    def edit
        @artist = Artist.find_by_id(params[:id])
    end

    def update
        artist = Artist.find_by_id(params[:id])
        
        if artist.update_attributes(artist_params)
            redirect_to artist_url(artist)
        else
            flash.now[:errors] = artist.errors.full_messages
            render :edit
        end
    end

    def destroy
        artist = Artist.find_by_id(params[:id])
        if artist
            artist.destroy_all
            redirect_to artists_url
        else
            flash.now[:errors] = ["Artist does not exist"]
            render :index
        end

    end

    private

    def artist_params
        params.require(:artist).permit(:name)
    end
end
