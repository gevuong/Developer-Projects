package main

import "fmt"

func main() {
	// create a new variable called card, where only a string will ever be assigned to this variable. This is important for statically-typed languages, like C++, Java, and Go. Dynamically-typed languages, such as JavaScript, Ruby, and Python, does not care what values we are assigning to variables.
	// to initialize and assign variable, shorthand method would be to use := syntax.
	card := "Ace of Spades". // this is same as var card string = "Ace of Spades"
	// Use := syntax ONLY when defining a new variable

	card = "Five of Diamonds"
	fmt.Println(card)
}
