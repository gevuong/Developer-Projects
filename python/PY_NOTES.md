## Python Basics

### Numbers

Division **always** results in a float, even if the result would be a whole number (e.g. 10 / 2 will give you 5.0).

You can create integers using the `int()` function. You can create floats using the `float()` function. Using `int()` on a float is not the same as using `round()` on one.

### Strings

Strings have to start and stop with the same quote symbol, either single (') or double (") or triple (''' or """) quotes. You also don't want to use that same quote symbol inside the string unless you escape with with backslash (\).

Strings can be combined with the plus sign (+) which is known as concatenation.

Strings can also be combined using string formatting which uses two braces ({}) as placeholders and the `.format()` method. You provide a bit of data to `.format()` for every placeholder in your string. For example:

```
"My {} is {}".format("name", "Kenneth")
```

This string has two placeholders so we have to give two new things to `.format()`.

The above would produce "My name is Kenneth".

**You can also multiply strings by an integer.** This will result in the string's content being repeated as many times as the value of the integer. `"hi" * 3` would create "hihihi".

And, finally, you can create a string from another value by using the str() function.


## Lists

In Python, when we want to hold onto multiple things at once, we put them into a list.

You can create a list with the list() function or using two square brackets ([]).

You can use the plus sign to add items into a list so long you add two lists together (e.g. [1, 2, 3] + [4, 5] would create [1, 2, 3, 4, 5].
[1, 2, 3] + 4 would create a TypeError). You can multiply a list by an integer and get back the content of the list as many times as the value of the integer (e.g. [1, 2] * 2 would produce [1, 2, 1, 2]).

You can use the `.append()` method to add a **single item** to the end of a list.

You can use the `.extend()` method to add **every item** from one list to another list.

You can use the `.remove()` method to remove a particular value from a list.

**Join**

The str type's .join() method lets us combine all of the items in a list into a string with a particular string between each pair of items. How about an example?

```
my_favorite_colors = ["green", "black", "silver"]
my_string = "My favorite colors are "
my_string + ", ".join(my_favorite_colors)
```

The above would produce "My favorite colors are green, black, silver".

```
available = "banana split;hot fudge;cherry"
sundaes = available.split(";")
menu = "Our available flavors are: {}.".format(", ".join(sundaes))
```

The above would produce "Our available flavors are: banana split, hot fudge, cherry".

You **cannot** join things that aren't strings. Doing ", ".join(5, 10, 15) will give you an exception.

However, Ruby's .join method is the following.
```
[ "a", "b", "c" ].join        #=> "abc"
[ "a", "b", "c" ].join("-")   #=> "a-b-c"
```

**Deletion**

`del my_list[0]` and `my_list.remove("a")` do two very different things so be careful when you use each one. `del` deletes an item at a particular index. `.remove()` deletes the first instance of the value you provide it.
You can't delete things from a string using `del`.


## Logic
The `bool()` function will tell you whether something (a variable, a comparison, or anything else) evaluates to true or false. It's super-handy for testing your assumptions when you're still learning.

True + True => 2

The following values are considered false:
- None
- False
- zero of any numeric type
- any empty sequence, '', (), []
- any empty mapping, {}

The `is` operator compares whether A has the same memory address as B

Python if blocks always start the same way:

```
time = 15

store_open = None
store_hours = [13, 14, 15, 16]

if time in store_hours:
    store_open = True
elif time not in store_hours:
    store_open = False
else:
    store_open = None
```

Python has two uses for the `in` keyword.
`in` returns whether or not a value is inside of a container. We can use this to see if, for example, a smaller string is in a bigger string or if a certain item is in a list.


Python has two loop types, `for` and `while`.

`for` loops run a certain number of times and then end themselves. `while` loops, on the other hand, run until their condition, like an if has, turns False. If it helps, you can think of `while` loops as repetitious ifs.

**For loop**

```
numbers = [1, 2, 3, 4]
doubles = []
for number in numbers:
    doubles.append(number*2)
```

This loop will run four times because there are four items in the numbers list. On each iteration of the loop, we're calling the value at the current index number.

**While loop**

```
start = 99
while start:
    print("{} bottles of milk on the wall, {} bottles of milk.".format(start, start))
    print("Take one down and pour it on some cereal.")
    start -= 1
    print("{} bottles of milk on the wall.".format(start))
```

This `while` loop will print out something like the traditional "99 bottles" song many of us used to annoy our parents on road trips. The loop stops when start becomes something False, which will happen when it's reduced to 0.

**break**

You can stop a loop early by using the keyword `break`.

```
for letter in "abcdef":
    if letter == "c":
        break
    print(letter)
```

This loop will print "a" and "b" and then stop because of the `break` when letter is "c".

`break` can only be used inside of a loop.

**continue**

```
for letter in "abcdef":
    if letter == "c":
        continue
    print(letter)
```

Nearly the same loop but this one will print "a", "b", "d", "e", and "f". It skips "c" because of the `continue`, which causes the loop to immediately move on to the next step in the loop.

Like break, `continue` can only be used inside of a loop.

**else**

And, finally, we have the `else`: block for both loops. If the loop ends naturally, meaning it doesn't have a break triggered and no exceptions happen, the loop's `else` block will happen, if one exists. The `else` block is entirely optional, just like with if.

```
for num in [2, 4, 6]:
    print(num*10)
else:
    print("That's all of the numbers, multiplied by 10.")
```

This loop can't throw an exception and doesn't have a break in it, so the` else` will always happen

**input**

We use the `input()` function to get information from a user.

input("WHAT is your favorite color? ") takes an optional prompt to use when you need to ask the user a particular question. Python doesn't add any space at the end of the prompt, though, so remember to do that yourself.

The value that comes in from `input()` is always a string, so if you need a number or something else, you'll need to convert it afterward.


**Functions**

The basics of creating a function are always the same.

`def function_name(argument):`

It always starts with the keyword `def`. Next comes the function name, which follows the same rules as variable names, so no spaces, hyphens, and it can't start with a number. After that is a set of parentheses which have your function's arguments, if any, in them. And then, of course, the line ends with a colon.

The body of the function should be indented.

If you want your function to be able to give an answer back to wherever it was called, like to a variable name or another function, you need to use the return keyword at the end of the function along with whatever value you want returned.

```
def even(num):
    if num % 2 == 0:
        return True
    else:
        return False
```

This function will return `True` or `False` depending on whether or not a number is evenly divisible by 2. As a test, can you think of a simpler way to write this?


**Exceptions**

We handle exceptions with two blocks, `try` and `except`.

The `try` block is just that, the word `try` followed by a colon. Inside of the block, indented, is the code that you think might 'cause an issue.

```
try:
    num = int(input("What is the airspeed velocity of an unladen swallow? "))
```

Now, someone might not give us a number for that and that would cause a ValueError. So let's catch it!

```
except ValueError:
```

This block will only trigger if the code in the `try` caused a ValueError. If the code in the `try` triggered a TypeError instead, though, this code would never run.

You'll want to create an `except` block for every type of exception your `try` block might cause.

Finally, you'll probably want an else block. This block will happen if your `try` didn't cause any exceptions.

Example

```
try:
    speed = int(input("What is the airspeed velocity of an unladen swallow? "))
except ValueError:
    print("What? I don't kno-oooooooooooooooo!")
else:
    print("I think a swallow could go faster than {}.".format(speed))
```
