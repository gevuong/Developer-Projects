# 12 edges, 6 faces, 8 vertices
class Cuboid
  attr_reader :origin, :length, :width, :height

  #BEGIN public methods that should be your starting point
  def initialize(origin = { x: 0, y: 0, z: 0 }, length, width, height)
    @origin = origin
    @length = length # along x-axis
    @width = width # along y-axis
    @height = height # along z-axis
    raise ArgumentError, "dimensions must be an Integer and greater than 0" if length < 1 || width < 1 || height < 1
  end

  def move_to!(x, y, z)
    @origin = { x: x, y: y, z: z }
    @origin
  end

  # Return a list of 8 vertices (corners)
  def vertices
    [
      [x0, y0, z0],
      [x0 + @length, y0, z0],
      [x0, y0 + @width, z0],
      [x0, y0, z0 + @height],
      [x0 + @length, y0 + @width, z0],
      [x0 + @length, y0, z0 + @height],
      [x0, y0 + @width, z0 + @height],
      [x0 + @length, y0 + @width, z0 + @height]
    ]
  end

  def intersects?(other_cuboid)
    # create counter hashes to store range of values a cuboid occupies along each axis
    hash_x = Hash.new(0)
    hash_y = Hash.new(0)
    hash_z = Hash.new(0)

    # store range of values self occupies into hashes
    (x0..x0 + @length).each do |el|
      hash_x[el] += 1
    end

    (y0..y0 + @width).each do |el|
      hash_y[el] += 1
    end

    (z0..z0 + @height).each do |el|
      hash_z[el] += 1
    end

    # store range of values other_cuboid occupies into hashes
    (other_cuboid.x0..other_cuboid.length).each do |el|
      hash_x[el] += 1
    end

    (other_cuboid.y0..other_cuboid.width).each do |el|
      hash_x[el] += 1
    end

    (other_cuboid.z0..other_cuboid.height).each do |el|
      hash_x[el] += 1
    end

    # if any values in the three hashes appear more than once, then the 2 cuboids are overlapping
    (hash_x.values + hash_y.values + hash_z.values).each do |el|
      return true if el > 1
    end

    false
  end

  #END public methods that should be your starting point

  protected

  def x0
    @origin[:x]
  end

  def y0
    @origin[:y]
  end

  def z0
    @origin[:z]
  end
end
