parsed_data = @fetched_data["response"]["user"]["friends"]["groups"][1]["items"]

parsed_data.each do |item|
    json.set! item["id"] do
        json.extract! item, "firstName"
    end
end
