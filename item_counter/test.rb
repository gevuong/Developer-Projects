class ItemCounter
  attr_accessor :item_count, :rides

  def initialize
    @item_count = Hash.new { |hash, key| hash[key] = Hash.new(0) }
    @rides = []
  end


  def process_ride(ride)
    # Step 0: push ride object into rides array. Whenever #process_ride is executed, each ride's basket_items is reconsidered due to new time intervals
    @rides.push(ride)
    @item_count = Hash.new { |hash, key| hash[key] = Hash.new(0) }

    # Step 1: store start_time and end_time of all rides as keys in hash
    @rides.each do |ride_obj|
      next if ride_obj.bike_basket_items.empty?
      @item_count[ride_obj.start_time]
      @item_count[ride_obj.end_time]
    end

    # Step 2: iterate through times array and check if time is within time range of ride object
    times = @item_count.keys # returns array

    @rides.each do |ride_obj|
      start_time = ride_obj.start_time
      end_time = ride_obj.end_time
      basket_items = ride_obj.bike_basket_items # returns hash

      times.each do |time|
        if time.between?(start_time, end_time - 60)
          basket_items.each do |item, quantity|
            @item_count[time][item] += quantity
          end
          # @item_count
        end
      end
    end

    # @item_count
  end

  def print_items_per_interval
    @item_count
  end
end


class Ride
  attr_reader :start_time, :end_time, :bike_basket_items

  def initialize(start_time, end_time, bike_basket_items = {})
    @start_time = start_time
    @end_time = end_time
    @bike_basket_items = bike_basket_items
  end

end


# Test cases
# to create Ride instance
ride_1 = Ride.new(Time.new(2018, 2, 19, 7, 0, 0), Time.new(2018, 2, 19, 7, 30, 0), { "apples" => 2, "brownies" => 1 })
ride_2 = Ride.new(Time.new(2018, 2, 19, 7, 10, 0), Time.new(2018, 2, 19, 8, 0, 0), { "apples" => 1, "carrots" => 3 })
ride_3 = Ride.new(Time.new(2018, 2, 19, 7, 20, 0), Time.new(2018, 2, 19, 7, 45, 0), { "apples" => 1, "brownies" => 2, "diamonds" => 4 })
ride_4 = Ride.new(Time.new(2018, 2, 19, 8, 0, 0), Time.new(2018, 2, 19, 8, 15, 0), {})

# item_counter = ItemCounter.new([ride_1, ride_2, ride_3, ride_4])

item_counter = ItemCounter.new
item_counter.process_ride(ride_1)
# # p item_counter.item_count
#
item_counter.process_ride(ride_2)
# # p item_counter.item_count
item_counter.process_ride(ride_3)
# p item_counter.rides

# item_counter.process_ride
p item_counter.item_count
