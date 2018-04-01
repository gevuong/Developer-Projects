class ArtistsController < ApplicationController
    before_action :require_login

    def create
        @artist = Artist.new(artist_params)
        if @artist.save
            redirect_to artist_url(@artist) # artist show page
        else
            flash.now[:errors] = @artist.errors.full_messages
            render :new
        end
    end

    def new
        @artist = Artist.new
    end

    def index
        @artists = Artist.all
    end

    def show
        @artist = Artist.find_by_id(params[:id])
        if @artist.nil?
            redirect_to artists_url
        end
    end

    def edit
        @artist = Artist.find_by_id(params[:id])
    end

    def update
        @artist = Artist.find_by_id(params[:id])

        if @artist.update(artist_params)
            redirect_to artist_url(@artist)
        else
            flash.now[:errors] = @artist.errors.full_messages
            render :edit
        end
    end

    def destroy
        artist = Artist.find_by_id(params[:id])
        if artist
            artist.destroy
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
