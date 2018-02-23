require 'active_support/inflector'

class ItemCounter
  attr_reader :item_counts, :rides

  def initialize
    @item_counts = Hash.new { |hash, key| hash[key] = Hash.new(0) }
    @rides = []
  end

  def process_ride(ride)
    # Step 0: process a single ride object by first pushing ride object into ivar. Doing so enables each ride object to be considered every time a new ride object is processed
    @rides.push(ride)
    @item_counts = Hash.new { |hash, key| hash[key] = Hash.new(0) }

    # Step 1: store start_time and end_time of all processed rides as keys in empty item_counts hash
    @rides.flatten.each do |ride_obj|
      @item_counts[ride_obj.start_time]
      @item_counts[ride_obj.end_time]
    end

    times = @item_counts.keys

    # Step 2: iterate ivar @rides, extract metadata of each processed ride. Iterate times array, and if a time is within start_time and end_time of said ride_object, store said bike_basket_items as values of said time
    @rides.each do |ride_obj|
      start_time = ride_obj.start_time
      end_time = ride_obj.end_time
      basket_items = ride_obj.bike_basket_items

      times.each do |time|
        if time.between?(start_time, end_time - 60) #between? is inclusive
          basket_items.each do |item, quantity|
            @item_counts[time][item] += quantity
          end
        end
      end
    end
  end

  def print_items_per_interval
    @times = []
    @items = []
    parse_times_and_items

    # print items per interval. Excludes time intervals during which no items were in transit. Note that the printed time intervals are sorted and continuous.
    (0...@times.length - 1).each do |idx|
      puts "#{@times[idx]}-#{@times[idx + 1]} -> #{@items[idx]}" unless @items[idx].empty?
    end
  end

  private
  # sort ivar based on time. Iterate ivar, converting and pushing new time format into times array, and constructing and pushing string of quantity and items into items_counts array
  def parse_times_and_items
    @item_counts.sort.each do |item_count|
      items = item_count[1] # returns hash
      time = item_count[0].strftime("%I:%M")
      @times.push(time)

      str = ""
      items.sort.each do |sub_arr|
        item = sub_arr[0]
        quantity = sub_arr[1]
        item = item.pluralize if quantity > 1
        str.concat("#{quantity} #{item}, ")
      end
      @items.push(str.slice(0...-2))

    end
  end

end


class Ride
  attr_reader :start_time, :end_time, :bike_basket_items

  def initialize(start_time, end_time, bike_basket_items = {})
    @start_time = start_time
    @end_time = end_time
    @bike_basket_items = bike_basket_items

    raise ArgumentError, "start_time and end_time must be Time objects" unless start_time.is_a?(Time) && end_time.is_a?(Time)

    validate_bike_basket_items(bike_basket_items)
  end

  def validate_bike_basket_items(bike_basket_items)
    bike_basket_items.each do |item, quantity|

      raise ArgumentError, "items must be a String" unless item.is_a?(String)

      raise ArgumentError, "quantity must be an Integer greater than 0" unless quantity.is_a?(Integer) && quantity > 0

    end
  end
end


# Test cases
ride_1 = Ride.new(
  Time.new(2018, 2, 19, 7, 0, 0),
  Time.new(2018, 2, 19, 7, 30, 0),
  { "apple" => 2, "brownie" => 1 }
)
ride_2 = Ride.new(
  Time.new(2018, 2, 19, 7, 10, 0),
  Time.new(2018, 2, 19, 8, 0, 0),
  { "apple" => 1, "carrot" => 3 }
)
ride_3 = Ride.new(
  Time.new(2018, 2, 19, 7, 20, 0),
  Time.new(2018, 2, 19, 7, 45, 0),
  { "apple" => 1, "brownie" => 2, "diamond" => 4 }
)

# test for no items in transit
ride_4 = Ride.new(
  Time.new(2018, 2, 19, 8, 31, 0),
  Time.new(2018, 2, 19, 8, 35, 0),
  {}
)

item_counter = ItemCounter.new

item_counter.process_ride(ride_1)
item_counter.process_ride(ride_2)
item_counter.process_ride(ride_3)
item_counter.process_ride(ride_4)

item_counter.print_items_per_interval
