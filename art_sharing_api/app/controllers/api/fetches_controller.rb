class Api::FetchesController < ApplicationController
    def index
        @fetched_data = HTTParty.get('https://api.foursquare.com/v2/users/self?oauth_token=IAG5XHTG5FVPJBSTGVXOZMBLKCGTHJCMJMSINCLEMLIIFMAH&v=20180403')

        @stack_exchange = Api::Fetch.new("stackoverflow", 1)

        if @fetched_data || @stack_exchange.users
            # render json: @fetched_data
            # render json: @stack_exchange.users
            render :index
        else
            render json: @fetched_data.errors.full_messages, status: 422
        end


    end
end
