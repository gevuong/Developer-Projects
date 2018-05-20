# need to convert coordinates to lat and long floats
hash = Hash.new { |hash, key| hash[key] = {} }
file = File.open("data/tallest_buildings_sf.tsv").each_with_index do |line, line_idx|
    next if line_idx == 0

    # line returns something like this: ["Salesforce Tower", "NULL", "1,070 (326)", "2017", "37°47′24″N,122°23′49″W"]
    line.strip.split("\t").each_with_index do |col_details, col_idx| 
        idx = line_idx - 1
        case col_idx 
        when 0
            hash[idx]["name"] = col_details 
        when 2
            hash[idx]["height"] = col_details
        when 3
            hash[idx]["year"] = col_details
        when 4
            hash[idx]["coordinates"] = col_details
        else 
            next # skip "image" column because values are NULL
        end
    end 
    p hash

end 

string = "37°47′24″N,122°23′49″W"
lat = 0 
long = 0
string.split(",").each_with_index do |coord, coord_idx|
    dms_coord = coord.gsub(/[°′″]/, ".").split(".") # returns ["37", "47", "24", "N"]

    dms_coord.each_with_index do |dms, dms_idx|
        case dms_idx, coord_idx
        when 0 && 
            dec
    end 
end 

def convert_coord_to_decimal

end 

# tallest_buildings_hash = Hash.new
# p headers.each do |header|
#     tallest_buildings_hash[header]
# end 
# Hash.new()

# class StrictTsv
#     attr_reader :filepath
#     def initialize(filepath)
#       @filepath = filepath
#     end
  
#     def parse
#       open(filepath) do |f|
#         headers = f.gets.strip.split("\t")
#         # f.each do |line|
#         #   fields = Hash[headers.zip(line.split("\t"))]
#         #   yield fields
#         # end
#       end
#     end
#   end
  
#   # Example Usage
#   tsv = StrictTsv.new("public_art_in_sf.tsv")

#   tsv.parse do |row|
#     puts row["Image"]
#   end


landmarks = {
    1 => {
        "Title" => "Transverse and Column",
        "Image" => "NULL",
        "Year" => "1977",
        "Location" => "Muni Barn, Corner of Ocean &amp; San Jose Ave,Curtis E. Green Metro Center",
        "Coordinates" => "NULL,NULL\r\n"
    },
    2 => {
        "Title" => "Transverse and Column",
        "Image" => "NULL",
        "Year" => "1977",
        "Location" => "Muni Barn, Corner of Ocean &amp; San Jose Ave,Curtis E. Green Metro Center",
        "Coordinates" => "NULL,NULL\r\n"
    }
}