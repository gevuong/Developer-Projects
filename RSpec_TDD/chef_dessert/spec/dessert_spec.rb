# required dependencies: Note that RSpec will by default include the lib/ folder in the require path so that we can use require and not require_relative.
require 'rspec'
require 'dessert'

# unit test is to test classes in isolation. Mocks let us write unit tests that isolate the functionality of a single class from other outside classes. Unit tests are very specific and are meant to isolate logical problems within a class. This lets us live up to the philosophy of unit tests: in each spec, test one thing only.

describe Dessert do # `describe` method creates an object that is a subclass of ExampleGroup. Within the block passed to `describe` you can declare Examples using the `it` method, which returns an instance of Example.

  let(:chef) { double('chef', name: 'Jacques Pepin') } # one-liner to create a test double (or fake object aka, a mock), and specify method to stub, :name. `chef` is an instance of Mock class, not Chef class.

  let(:brownie) { Dessert.new('brownie', 10, chef) } # `let` method is used to define a memoized helper method, and does not persist state. Value will be cached across multiple calls in same Example instance (`it` block), but not across other Example instances. See below for subject vs let.

  describe '#initialize' do # use name of method you're testing (use "#method" for instance methods, and "::method" for class methods)
    it 'sets dessert type' do #`it` method returns an instance of Example
      expect(brownie.type).to eq('brownie')
    end

    it 'sets dessert quantity' do
      expect(brownie.quantity).to eq(10)
    end

    it 'sets name of chef' do
      expect(chef.name).to eq('Jacques Pepin')
    end

    it 'starts ingredients as empty array' do
      expect(brownie.ingredients).to eq([])
    end

    it 'raises ArgumentError when given a non-integer quantity' do
      expect { Dessert.new("cake", "5", chef) }.to raise_error(ArgumentError)
    end
  end

  describe '#add_ingredient' do
    it 'adds ingredient to ingredients array' do
      brownie.add_ingredient('flour')
      expect(brownie.ingredients).to include("flour")
    end
  end

  describe '#mix!' do
    it 'shuffles ingredients array' do
      ingredients = ['chocolate', 'vanilla extract', 'flour', 'eggs']

      ingredients.each do |ingredient|
        brownie.add_ingredient(ingredient)
      end

      expect(brownie.ingredients).to eq(ingredients)

      brownie.mix!

      expect(brownie.ingredients).not_to eq(ingredients)
      expect(brownie.ingredients.sort).to eq(ingredients.sort)
    end
  end

  describe '#eat' do
    it 'subtracts amount eaten from quantity' do
      brownie.eat(3)
      expect(brownie.quantity).to eq(7)
    end

    it 'raises error if amount eaten is greater than available quantity' do
      # use block construction to test that a certain method will throw error. Arg construction is preferred except when block construction is necessary
      expect { brownie.eat(11) }.to raise_error('There is not enough left!')
    end
  end

  describe '#serve_by' do
    it 'contains the titleized version of the chef\'s name' do
      allow(chef).to receive(:titleize).and_return('Chef Jacques Pepin') # create stub method for mock double, passing in :titleize method to stub. The parameter of `and_return` method takes the return value that the stubbed method returns. 
      expect(brownie.serve_by).to eq("Chef Jacques Pepin has made 10 brownies!")
    end
  end

  describe '#make_more' do
    it 'calls bake on chef, with dessert passed in' do
      expect(chef).to receive(:bake).with(brownie)
      brownie.make_more
      # use Method Expectations to make sure tested object is supposed to call proper methods on other objects. Expectations need to be set up in advance before calling `make_more` method. Here, we want to make sure that when we call `make_more` on `brownie` object, it tells chef to bake more dessert by specifying that bake is passed a dessert.
    end
  end
end

=begin subject vs let
RSpec requires that the `subject` be declared outside of your `it` blocks.
1. 'let' can be used to define multiple helper objects.
2. 'let' does not persist state. Instead, 'let' memoizes its return value, (meaning the first time method is invoked, the return value is cached and that same value is returned every subsequent time the method is invoked within the same scope) and returns same value within the same scope. Since every `it` is a different scope, `let` does not persist state between those specs.
3. 'subject' is the focus of the test. There can only be one 'subject'. If a second 'subject' is declared, the value of 'subject' inside of 'it' block will use more recent defintion.
=end
