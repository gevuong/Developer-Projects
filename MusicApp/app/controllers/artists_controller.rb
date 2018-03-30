class ArtistsController < ApplicationController
    def create
        artist = Artist.new(artist_params)
        if artist.save
            redirect_to artists_url(artist) # artist show page
        else
            flash.now[:errors] = artist.errors.full_messages
            render :new
        end
    end

    def new
        render :new
    end

    def show
        render :show
    end

    private

    def artist_params
        params.require(:artist).permit(:name)
    end
end
