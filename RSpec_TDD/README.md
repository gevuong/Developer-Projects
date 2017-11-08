## Trivia Notes

* A gem called 'rspec' is actually a meta-gem that packages three other gems: rspec-core, rspec-expectations, and rspec-mocks.

* Both `describe` and `it` take strings as arguments. For `describe`, use the name of the method you're testing (use "#method" for instance methods, and "::method" for class methods). For `it`, you should `describe` the behavior that you're testing inside that `it` block. `describe` can also take a constant that should be the name of the class or module you're testing (i.e. `describe Student do`).

* You can nest `describe` blocks arbitrarily deep. When nesting, also consider the use of `context`, which is an alias for `describe` that can be a bit more descriptive.

* `describe` and `it` organize your tests and give them descriptive labels. `expect` will actually be doing the work of testing your code. Its task is to match between a value your code generates and an expected value.

* Test-driven development dictates that tests, not application code, should be written first. Then application code should only be written to pass already written specs.

* Red, Green, Refactor describes the proper TDD workflow.

1. Red: Write the tests and watch them fail (go red). It's important to ensure the tests initially fail so that you don't have false positives.
2. Green: Write the (minimum amount of) code to make the tests pass (go green).
3. Refactor: Refactor the code you just wrote. Your job is not over when the tests pass; you got it working, now make it clean.

* Generally, TDD developers keep their Red, Green, Refactor loop pretty tight. They'll write a few related tests, then implement the functionality, then refactor, then repeat. You keep the units small.



* RSpec is particular about the order in which we invoke its various methods. RSpec enforces a hierarchy/ordering of its methods, and you need to arrange your blocks within the context of that structure.
For example, RSpec requires that the `subject` be declared outside of your `it` blocks.


* `let` works just like `subject`, but whereas `subject` is the focus of the test, `let` defines helper objects. Another difference is that there can only be one (unnamed) `subject` (if you declare a second `subject`, the value of `subject` inside of your `it` blocks will use the more recent definition). On the other hand, you can define many helper objects through `let`.

* Memoization means that the first time the method is invoked, the return value is cached and that same value is returned every subsequent time the method is invoked within the same scope. Since every `it` is a different scope, `let` does not persist state between those specs.
