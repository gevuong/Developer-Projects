@fetched_data["response"]["user"]["friends"]["groups"][1]["items"].each do |item|
    json.set! item["id"] do
        json.extract! item, "firstName"
        # json.extract! item, "lastName"
    end
end

# @stack_exchange.users
# @fetched_data.each do |data|
#     json.set! data.id do
#         json.extract! data, :homeCity
#     end
# end
