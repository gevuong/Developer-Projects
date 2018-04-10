class Api::FetchesController < ApplicationController

    def index
        # @fetched_data = Api::Fetch.fetch
        nps = Api::Fetch.new("50")
        if nps
            @nps_campgrounds = nps.campgrounds
            # render json: @nps_campgrounds
            render :index
        else
            render json: nps.errors.full_messages # ["429 status code: Too many requests have been sent in the past hour. Only 1,000 requests per hour are allowed. Try again soon. Thanks. =)"]
        end
    end
end
