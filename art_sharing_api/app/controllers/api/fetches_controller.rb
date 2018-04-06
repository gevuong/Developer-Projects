# require 'open-uri'

class Api::FetchesController < ApplicationController
    # include HTTParty
    def index
        fetched_page = HTTParty.get('https://api.foursquare.com/v2/users/self?oauth_token=IAG5XHTG5FVPJBSTGVXOZMBLKCGTHJCMJMSINCLEMLIIFMAH&v=20180403')

        stack_exchange = Fetch.new("stackoverflow", 1)
      # puts stack_exchange.questions
      # puts stack_exchange.user
        if stack_exchange
            # render json: fetched_page
            render json: stack_exchange
        else
            render json: fetched_page.errors.full_messages, status: 422
        end


    end
end
