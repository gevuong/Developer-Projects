class ItemCounter
  attr_accessor :item_count

  def initialize
    @item_count = Hash.new { |hash, key| hash[key] = Hash.new(0) }
  end

  # Processes a Ride object that contains metadata about the ride, including: start time, end time, and bike basket items.
  def process_ride(ride)
    # initialize first ride
    if @item_count.empty?
      @item_count[ride.start_time] = ride.bike_basket_items
      @item_count[ride.end_time] = {}
      return @item_count
    end

    current_times = @item_count.keys
    indices = (0...current_times.length).select { |idx| idx % 2 == 0 } # times array will always be of even length due to start and end times.

    # iterate through each pair of time ranges
    indices.each do |idx|
      start_time = current_times[idx]
      end_time = current_times[idx + 1]

      if ride.start_time.between?(start_time, end_time - 60) # subtract a minute because #between? is inclusive
        new_basket_items = ride.bike_basket_items # returns a hash of bike_basket_items and quantity
        current_basket_items = @item_count[current_times[idx]]

        new_basket_items.each do |new_item, quantity|
          if current_basket_items[new_item].nil?
            current_basket_items[new_item] = quantity
          else
            current_basket_items[new_item] += quantity
          end
        end

        @item_count[ride.start_time] = current_basket_items
        @item_count[ride.end_time] = {}
      end
    end

    # if start_time is not between any current time ranges in @item_count, then create new key-value pair
    if @item_count[ride.start_time].nil?
      p "enter last condition"
      @item_count[ride.start_time] = ride.bike_basket_items
      @item_count[ride.end_time] = {}
    end
  end

  @item_count
end

# Prints a summary of the numbers of each type of item in transit during any given time interval. **Excludes time intervals during which no items were in transit.
  # def print_items_per_interval
  #
  # end



class Ride
  attr_reader :start_time, :end_time, :bike_basket_items

  def initialize(start_time, end_time, bike_basket_items = {})
    @start_time = start_time
    @end_time = end_time
    @bike_basket_items = bike_basket_items
  end

end

# to create Ride instance
ride_1 = Ride.new(Time.new(2018, 2, 19, 7, 0, 0), Time.new(2018, 2, 19, 7, 30, 0), { "apples" => 2, "brownies" => 1 })
ride_2 = Ride.new(Time.new(2018, 2, 19, 7, 10, 0), Time.new(2018, 2, 19, 8, 0, 0), { "apples" => 1, "carrots" => 3 })
ride_3 = Ride.new(Time.new(2018, 2, 19, 7, 20, 0), Time.new(2018, 2, 19, 7, 45, 0), { "apples" => 1, "brownies" => 2, "diamonds" => 4 })

item_counter = ItemCounter.new
item_counter.process_ride(ride_1)
p item_counter.item_count

item_counter.process_ride(ride_2)
p item_counter.item_count

# item_counter.process_ride(ride_3)
# p item_counter.item_count

# ride_1 = {
#   start_time: DateTime.new(2018, 2, 19, 7, 0, 0),
#   end_time: DateTime.new(2018, 2, 19, 7, 30, 0),
#   bike_basket_items: {
#     "apples" => 2,
#     "brownie" => 1
#   }
# }
#
# ride_2 = {
#   start_time: DateTime.new(2018, 2, 19, 7, 10, 0),
#   end_time: DateTime.new(2018, 2, 19, 8, 0, 0),
#   bike_basket_items: {
#     "apple" => 1,
#     "carrots" => 3
#   }
# }
#
# ride_3 = {
#   start_time: DateTime.new(2018, 2, 19, 7, 20, 0),
#   end_time: DateTime.new(2018, 2, 19, 7, 45, 0),
#   bike_basket_items: {
#     "apples" => 2,
#     "brownie" => 1,
#     "diamonds" => 4
#   }
# }
# Time.new(2018, 2, 15, 7, 0, 0), Time.new(2018, 2, 15, 7, 30, 0)
