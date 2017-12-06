require 'HTTParty'
require 'Nokogiri'
require 'JSON'
require 'Pry'
require 'csv'

# HTTParty send HTTP request to page we're going to scrape. "page" returns a string of HTML from craigslist site we're scraping'
page = HTTParty.get('https://newyork.craigslist.org/search/pet?s=0')

# transform http response (HTML string of pets listing) into a nokogiri object to begin parsing data and extracting info from page.
parse_page = Nokogiri::HTML(page)

# empty array to store all craigslist pets
pets_array = []

# parse data using Nokogiri's .css method to drill into HTML document and find headline text of all pet listings
parse_page.css('.content').css('.rows').css('.hdrlnk').map do |post|
  post_name = post.text
  pets_array.push(post_name)
end

# push array into csv file. You need to specify a mode in the second arg. For more info on what the second arg means: https://stackoverflow.com/questions/17866291/what-is-the-second-parameter-argument-to-csv-open-in-ruby
CSV.open('pets.csv', 'w') do |csv|
  csv << pets_array
end

# used to return results (i.e. page, parse_page, pets_array) in pry
# Pry.start(binding)
