require 'HTTParty' # https://github.com/jnunemaker/httparty
require 'Nokogiri'
require 'mechanize' # https://www.chrismytton.uk/2015/01/22/advanced-web-scraping-with-mechanize/
require 'Pry'
require 'date'
require 'json'

# HTTParty sends HTTP request and returns a string of HTML
z2_page = HTTParty.get('https://z2trackdays.com/events/')
lets_ride_page = HTTParty.get('https://www.letsridetrackdays.com/index.php/register/single-track-days?limit=50')
ptt_page = []
keigwins_page = [] 
parse_z2 = Nokogiri::HTML(z2_page)

agent = Mechanize.new 
z2_page_mech = agent.get("https://z2trackdays.com/events/")
event_links = z2_page_mech.links_with(href: /\/events\/[sonoma]/)


# event_links.each do |link|
#     event = link.click
#     event_price = event.search("td.em-bookings-ticket-table-price")
# end 

hash = Hash.new { |hash, key| hash[key] = {} }

key = 1
parse_z2.css('table.events-table tr td').each_with_index do |data, idx|
    if idx % 2 == 0
        date = data.text.strip
        hash[key]["organizer"] = "z2"
        hash[key]["date"] = Date.strptime(date, "%m/%d/%Y")
        next
    elsif idx % 2 != 0
        title, location = data.text.strip.split("\r\n")
        url = data.css("a")[0]["href"]
        hash[key]["title"] = title.strip 
        hash[key]["location"] = location.strip unless location.nil?
        hash[key]["url"] = url
        key += 1
    end 
end 


# test variables in pry
Pry.start(binding)


# sample state
# 1 => {
    # id: 1,
    # organizer_id: 1,
    # organizer: 'Z2', 
    # track_name: 'Sonoma Raceway',
    # location: 'Sonoma, CA',
    # date: '04/01/2018',
    # description: "",
    # price: 230,
    # url: "https://z2trackdays.com/events/sonoma-20180401/"
# }


