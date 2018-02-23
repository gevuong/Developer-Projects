require 'active_support/inflector'

class ItemCounter
  attr_reader :item_counts, :rides

  def initialize
    @item_counts = Hash.new { |hash, key| hash[key] = Hash.new(0) }
    @rides = []
  end

  def process_ride(ride)
    # Step 0: push ride object into ivar @rides whenever a ride object is processed. This enables each ride object to be considered every time a new ride object is processed
    @rides.push(ride)
    @item_counts = Hash.new { |hash, key| hash[key] = Hash.new(0) }

    # Step 1: store start_time and end_time of all processed rides as keys in hash
    @rides.each do |ride_obj|
      next if ride_obj.bike_basket_items.empty? # excludes time intervals during which no items were in transit

      @item_counts[ride_obj.start_time]
      @item_counts[ride_obj.end_time]
    end

    # Step 2: iterate through times array and check if time is within time range of ride object
    times = @item_counts.keys # returns array

    @rides.each do |ride_obj|
      start_time = ride_obj.start_time
      end_time = ride_obj.end_time
      basket_items = ride_obj.bike_basket_items # returns hash

      times.each do |time|
        if time.between?(start_time, end_time - 60)
          basket_items.each do |item, quantity|
            @item_counts[time][item] += quantity
          end
        end
      end
    end
  end


  def print_items_per_interval
    # Step 0: sort hash based on time
    times = []
    items_counts = []

    @item_counts.sort.each do |item_count|
      time = item_count[0].strftime("%I:%M")
      times.push(time)
      items = item_count[1] # returns hash

      # puts time
      str = ""
      items.sort.each do |sub_arr|
        item = sub_arr[0]
        quantity = sub_arr[1]
        item = item.pluralize if quantity > 1
        str.concat("#{quantity} #{item}, ")
      end
      items_counts.push(str.slice(0...-2))
    end

    (0...times.length - 1).each do |idx|

      return puts "#{times[idx]}-#{times[idx + 1]} -> #{items_counts[idx]}" if idx == times.length - 2
      puts "#{times[idx]}-#{times[idx + 1]} -> #{items_counts[idx]}"
    end
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
# create Ride instances
ride_1 = Ride.new(Time.new(2018, 2, 19, 7, 0, 0), Time.new(2018, 2, 19, 7, 30, 0), { "apples" => 2, "brownies" => 1 })
ride_2 = Ride.new(Time.new(2018, 2, 19, 7, 10, 0), Time.new(2018, 2, 19, 8, 0, 0), { "apples" => 1, "carrots" => 3 })
ride_3 = Ride.new(Time.new(2018, 2, 19, 7, 20, 0), Time.new(2018, 2, 19, 7, 45, 0), { "apples" => 1, "brownies" => 2, "diamonds" => 4 })

# no items in transit
ride_4 = Ride.new(Time.new(2018, 2, 19, 8, 0, 0), Time.new(2018, 2, 19, 8, 15, 0), {})


item_counter = ItemCounter.new
item_counter.process_ride(ride_1)
item_counter.process_ride(ride_2)
item_counter.process_ride(ride_3)
# p item_counter.rides
# p item_counter

p item_counter.print_items_per_interval
