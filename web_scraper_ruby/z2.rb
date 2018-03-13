require 'mechanize' # https://www.chrismytton.uk/2015/01/22/advanced-web-scraping-with-mechanize/
require 'Pry'
require 'date'
require 'json'

# send HTTP GET request to URL and return a Mechanize 
agent = Mechanize.new 
z2_page = agent.get("https://z2trackdays.com/events/")
ptt_page = []
keigwins_page = [] 
lets_ride_page = []

event_links = z2_page.links_with(href: /(\/events\/.+)[0-9\-]{7}\/$/) # returns an array of Mechanize::Page::Link

# initialize
hash = Hash.new { |hash, key| hash[key] = {} }
key = 1

# parse data using Mechanize's #search 
z2_page.search('table.events-table tr td').each_with_index do |table_data, idx|

    if idx % 2 == 0 # parse and store date in hash
        date = table_data.text.strip # remove whitespace
        next unless date.include?("2018")
        hash[key]["organizer"] = "z2"
        hash[key]["date"] = Date.strptime(date, "%m/%d/%Y")
        next
    elsif idx % 2 != 0
        title, location = table_data.text.strip.split("\r\n")
        url = table_data.css("a")[0]["href"]
        next unless location || url.include?("2018")
        hash[key]["title"] = title.strip 
        hash[key]["location"] = location.strip
        hash[key]["register_url"] = url
        key += 1
    end 

end 

# access each event link and parse data from each page
event_links.each_with_index do |link, idx|
    event = link.click # Mechanize::Page
    table_rows = event.search("tr.em-ticket")
    table_data_price = ""

    table_rows.each do |row|
        table_data_type = row.css("td.em-bookings-ticket-table-type").text
        if table_data_type.include?("Novice")
            table_data_price = row.css("td.em-bookings-ticket-table-price").text 
            break
        end 
    end 
    hash[idx + 1]["novice_price"] = table_data_price

end 


# Pry is an IRB alternative and runtime developer console to help with debugging
Pry.start(binding) # binding.pry also works I believe


# sample of returned object
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


