require 'active_support/inflector' # allows the use of .pluralize/singularize/.titleize

class Dessert
  attr_reader :type, :quantity, :ingredients, :chef

  def initialize(type, quantity, chef)
    raise ArgumentError unless quantity.is_a?(Integer)

    @type = type
    @quantity = quantity
    @chef = chef
    @ingredients = []
  end

  def add_ingredient(ingredient)
    @ingredients.push(ingredient)
  end

  def mix!
    @ingredients.shuffle!
  end

  def eat(amount)
    raise 'There is not enough left!' if @quantity - amount < 0
    @quantity -= amount
  end

  def serve_by
    "#{@chef.titleize}, has made #{@quantity} #{@type.pluralize}!"
  end

  def make_more
    @chef.bake(self)
  end
end
