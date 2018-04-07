@fetched_data["response"]["user"]["friends"]["groups"][1]["items"].each do |item|
    json.set! item["id"] do
        json.extract! item, "firstName"
        # json.extract! item, "lastName"
    end
end
