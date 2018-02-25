### Notes to self

- Compared to private methods, protected methods can be invoked by objects of its defining class and subclass. protected methods can be called with an explicit receiver from the same class the method was defined in, whereas private methods cannot be called with an explicit receiver. Only way to access a private method is to call it within a public method.

#### `subject` vs `let`
* When testing a class, both `subject` and `let` are used to instantiate an instance of the object to test out.
* You can declare a `subject` with a name and accepts a block that constructs the subject.

```
subject(:robot) { Robot.new }
let(:light_item) { double("light_item", :weight => 1) }
let(:max_weight_item) { double("max_weight_item", :weight => 250)
```

* The difference is that there can only be one (unnamed) `subject`. If you declare a second `subject`, the value of subject inside of your `it` blocks will use the most recent definition. `let` defines helper objects, and you can define many helper objects through `let`.

* `let` does not persist state. `let` memoizes its return value. Memoization means that the first time the method is invoked, the return value is cached and that same value is returned every subsequent time the method is invoked within same scope.

Example:
```
describe "Cat" do
  let(:cat) { Cat.new("Sennacy") }

  describe "name property" do
    it "returns something we can manipulate" do
      cat.name = "Rocky"
      expect(cat.name).to eq("Rocky")
    end

    it "does not persist state" do
      expect(cat.name).to eq("Sennacy")
    end
  end
end

# => All specs pass
```
