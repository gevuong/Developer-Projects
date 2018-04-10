class Api::Fetch < ApplicationRecord
    include HTTParty
    #base_uri is a HTTParty class method
    base_uri('https://developer.nps.gov/api/v1')

    def initialize(limit, api_key = generate_random_api_key)
        @options = {
            query: {
                limit: limit,
                api_key: api_key
                }
            }
    end

    def generate_random_api_key
        api_key = [
            "DgxI2OorIMB526wU4s8a380kHTqaokfjGMNISAzT"
        ]

        api_key.sample
    end

    def campgrounds
        self.class.get("/campgrounds", @options)
    end

    # eventually, assign an external API to pass based on client-side filtering option (i.e. stack overflow, foursqure)
    def self.fetch
        response = HTTParty.get(
            'https://developer.nps.gov/api/v1/campgrounds?limit=50&api_key=DgxI2OorIMB526wU4s8a380kHTqaokfjGMNISAzT'
        )
        # response = HTTParty.get(
        #     'https://api.foursquare.com/v2/users/self?oauth_token=IAG5XHTG5FVPJBSTGVXOZMBLKCGTHJCMJMSINCLEMLIIFMAH&v=20180403'
        # )
    end
end
