# demo from HTTP docs

class Api::Fetch < ApplicationRecord
    include HTTParty
    #base_uri is a HTTParty class method
    base_uri('api.stackexchange.com')

    def initialize(service, page)
        @options = { query: { site: service, page: page } }
    end

    def questions
        self.class.get("/2.2/questions", @options)
    end

    def users
        self.class.get("/2.2/users", @options)
    end

    # eventually, assign an external API to pass based on client-side filtering option (i.e. stack overflow, foursqure)
    def self.fetch
        response = HTTParty.get(
            'https://api.foursquare.com/v2/users/self?oauth_token=IAG5XHTG5FVPJBSTGVXOZMBLKCGTHJCMJMSINCLEMLIIFMAH&v=20180403'
        )
    end
end
