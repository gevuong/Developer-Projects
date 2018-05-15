package main

import "fmt"

func main() {
	// create a new variable called card, where only a string will ever be assigned to this variable. same as var card string = "Ace of Spades". // Use := syntax ONLY when defining a new variable
	card := newCard()
	fmt.Println(card)

	// syntax to create a slice of type string
	cards := deck{"Ace of Diamonds", newCard()}

	// append() add ons a new string, does not modify existing string, but returns a new slice
	cards = append(cards, "Six of Spades")

	// assign index and value of every element in cards slice to the variables, idx and card.
	for idx, card := range cards {
		fmt.Println(idx, card)
	}
}

// need to tell Go exactly what data type function is going to return. In this case, it would return a string. This means that whenever newCard() is called, it is going to return a value of type string.
func newCard() string {
	return "Five of Diamonds"
}
