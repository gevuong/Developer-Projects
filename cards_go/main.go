package main

import "fmt"

func main() {
	// create a new variable called card, where only a string will ever be assigned to this variable. This is important for statically-typed languages, like C++, Java, and Go. Dynamically-typed languages, such as JavaScript, Ruby, and Python, does not care what values we are assigning to variables.
	// to initialize and assign variable, shorthand method would be to use := syntax.
	card := newCard() // this is same as var card string = "Ace of Spades"
	// Use := syntax ONLY when defining a new variable
	fmt.Println(card)

	cards := []string{"Ace of Diamonds", newCard()} // syntax to create a slice of type string
	cards = append(cards, "Six of Spades")          // append() add ons a new string, does not modify existing string, but returns a new slice

	// assign index and value of every element in cards slice to the variables of idx and card. We're using := syntax because for each iteration, we're basically throwing away previous idx and card that had been initialized and declared. So we need to re-initialize and re-declare those variables.
	for idx, card := range cards {
		fmt.Println(idx, card)
	}
}

// need to tell Go exactly what data type is going to be returned. In this case, it would return a string. This means that whenever newCard() is called, it is going to return a value of type string.
func newCard() string {
	return "Five of Diamonds"
}
