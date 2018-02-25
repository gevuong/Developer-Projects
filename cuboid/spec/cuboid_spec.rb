require 'rspec'
require 'cuboid'

#This test is incomplete and, in fact, won't even run without errors.
# Do whatever you need to do to make it work and please add your own test cases for as many methods as you feel need coverage

describe Cuboid do
  subject { Cuboid.new(3, 4, 5) }

  describe "initialize" do

    it "stores an origin which defaults to { x: 0, y: 0, z: 0 }" do
      expect(subject.origin).to eq(x: 0, y: 0, z: 0)
    end

    it "stores a length" do
      expect(subject.length).to eq(3)
    end

    it "stores a width" do
      expect(subject.width).to eq(4)
    end

    it "stores a height" do
      expect(subject.height).to eq(5)
    end

    it "raises ArgumentError when dimensions are non-integers" do
      expect { Cuboid.new("3", 4, 5) }.to raise_error(ArgumentError)
    end

    it 'raises ArgumentError unless dimensions are greater than 0' do
      expect { Cuboid.new(-1, 4, 5) }.to raise_error(ArgumentError)
    end
  end

  describe "move_to!" do
    it "changes origin to new origin" do
      expect(subject.move_to!(1, 2, 3)).to eq({ x: 1, y: 2, z: 3 })
    end
  end

  describe "vertices" do
    it "returns an array of 8 vertices" do
      expect(subject.vertices).to be_an_instance_of(Array)
      expect(subject.vertices).to eq([
        [0, 0, 0],
        [3, 0, 0],
        [0, 4, 0],
        [0, 0, 5],
        [3, 4, 0],
        [3, 0, 5],
        [0, 4, 5],
        [3, 4, 5]
      ])
      expect(subject.vertices.length).to eq(8)
    end
  end

  describe "intersects?" do
    origin = { x: 2, y: 3, z: 3 }
    other_cuboid = Cuboid.new(origin, 3, 4, 5)

    it "returns true if cuboid intersects other cuboid" do
      expect(subject.intersects?(other_cuboid)).to be(true)
    end

    context "when cuboid does not intersect other cuboid" do
      before(:each) do
        other_cuboid.move_to!(4, 5, 6)
      end

      it "should return false" do
        expect(subject.intersects?(other_cuboid)).to be(false)
      end
    end
  end

end
