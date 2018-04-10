@campgrounds = @nps_campgrounds["data"]
json.array! @campgrounds, "name", "description"
