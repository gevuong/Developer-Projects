# response = HTTParty.get('https://api.foursquare.com/v2/users/self?oauth_token=IAG5XHTG5FVPJBSTGVXOZMBLKCGTHJCMJMSINCLEMLIIFMAH&v=20180403')

# demo from HTTP docs
response = HTTParty.get('http://api.stackexchange.com/2.2/questions?site=stackoverflow')

# puts response.body
# , response.code, response.message, response.headers.inspect

class Api::Fetch < ApplicationRecord
    # #base_uri is a HTTParty's class method
    base_uri 'api.stackexchange.com'

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

#   stack_exchange = StackExchange.new("stackoverflow", 1)
#   puts stack_exchange.questions
#   puts stack_exchange.users
#
#
# class StackExchange
#   include HTTParty
#   base_uri 'api.stackexchange.com'
#
#   def initialize(service, page)
#     @options = { query: { site: service, page: page } }
#   end
#
#   def questions
#     self.class.get("/2.2/questions", @options)
#   end
#
#   def users
#     self.class.get("/2.2/users", @options)
#   end
# end
#
# stack_exchange = StackExchange.new("stackoverflow", 1)
# puts stack_exchange.questions
# puts stack_exchange.users
