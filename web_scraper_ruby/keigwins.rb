require 'HTTParty'
require 'Nokogiri'
require 'JSON'
require 'Pry'
require 'csv'

keigwins_page = HTTParty.get('http://www.keigwins.com/events_schedule.php')

parse_page = Nokogiri::HTML(keigwins_page)

events_array = []
hash = Hash.new
str = ""
arr = []
posting = []
parse_page.css('.schedule').css('.scheduleDate').map.with_index do |post, idx|
  posting.push(post.text)
  post.text.gsub(/(\n)/, "").split("-").map.with_index do |el, idx2|
    if idx2 == (post.text.gsub(/(\n)/, "").split("-").length) - 1
      str << el.strip!
    else
      str << el.strip! + " "
    end
  end
  str = ""
  hash[idx] = str
  events_array.push(str)
end

# parse_page.css('.schedule').css('.scheduleDate').map do |post|
#   hash[idx]
# end


Pry.start(binding)
