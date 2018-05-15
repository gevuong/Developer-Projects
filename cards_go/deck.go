package main

import "fmt"

// create a new type of 'deck', which is a slice of string
type deck []string // this means that type deck === []string

// create and return a list of playing cards, or an array of strings. Remember to specify the return type, which in this case is of type deck. need to tell Go exactly what data type function is going to return. In this case, it would return a string. This means that whenever newCard() is called, it is going to return a value of type string.
func newDeck() deck {
	cards := deck{}

	cardSuits := []string{"diamonds", "clubs", "heart", "spades"}
	cardValues := []string{"ace", "two", "three", "four"}

	for _, suit := range cardSuits {
		for _, value := range cardValues {

			// append() add ons a new string, does not modify existing string, but returns a new slice
			cards = append(cards, value+" of "+suit)
		}
	}

	return cards
}

// create a receiver on print(), or "instance method" called print(), that loops through deck of cards and prints each card. This means that any variable of type "deck" now gets access to print method. What does "d deck" mean? d is the variable containing copy of deck that can be used within function, it's like the instance of the deck variable that we're working with, or "self" in Ruby or "this" in Python. If you still don't get it, in main.go, "cards" is essentially the d variable in this case. "deck" is the type that we want to attach the print() method to.
func (d deck) print() {

	// assign index and value of every element in cards slice to the variables, idx and card.
	for idx, card := range d {
		fmt.Println(idx, card)
	}
}
