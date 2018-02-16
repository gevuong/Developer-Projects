class ItemCounter

  # Processes a Ride object that contains metadata about the ride, including: start time, end time, and bike basket items.
  def process_ride(ride)

  end

# Prints a summary of the numbers of each type of item in transit during any given time interval. **Excludes time intervals during which no items were in transit.
  def print_items_per_interval

  end
end

# ItemCounter.print_items_per_interval

class Ride
  attr_reader :start_time, :end_time, :bike_basket_items

  def initialize(start_time, end_time, bike_basket_items = {})
    @start_time = start_time
    @end_time = end_time
    @bike_basket_items = bike_basket_items
  end

end


ride_1 = Ride.new(Time.new(2018, 2, 15, 7, 0, 0), Time.new(2018, 2, 15, 7, 30, 0), { "apples" => 2, "brownies" => 1 })
ride_2 = Ride.new(Time.new(2018, 2, 15, 7, 10, 0), Time.new(2018, 2, 15, 8, 0, 0), { "apples" => 1, "carrots" => 3 })
ride_3 = Ride.new(Time.new(2018, 2, 15, 7, 20, 0), Time.new(2018, 2, 15, 7, 45, 0), { "apples" => 1, "brownies" => 2, "diamonds" => 4 })

p ride_1
p ride_2
p ride_3

# Time.new(2018, 2, 15, 7, 0, 0), Time.new(2018, 2, 15, 7, 30, 0)
