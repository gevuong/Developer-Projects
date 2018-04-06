# demo from HTTP docs

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
end
