# demo from HTTP docs

@fetched_data = HTTParty.get('https://api.foursquare.com/v2/users/self?oauth_token=IAG5XHTG5FVPJBSTGVXOZMBLKCGTHJCMJMSINCLEMLIIFMAH&v=20180403')

class Api::Fetch < ApplicationRecord
    include HTTParty
    #base_uri is a HTTParty's class method
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

    # filters based on search query params, then sorts remaining data
    def self.search(search_query)
        # Step 1: parse fetched_data JSON object (ie. firstNames ). Return an array of strings, stack overflow questions.

        # use #select() method
        # Step 2: iterate array, and for each string, implement a #include, if true. Use two-pointer, in-place algorithm. One slow pointer, one fast pointer. The slow pointer tracks which element should be swapped. The fast pointer is the iterator.

        # Step 3: Sort remaining array and return array.

    end
end
