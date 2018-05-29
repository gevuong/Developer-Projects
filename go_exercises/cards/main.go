package main

func main() {

	// := syntax to create a slice of type deck. := syntax initializes and assigns a variable, now cards is of type deck containing a slice of cards
	// cards := newDeck()
	// cards.saveToFile("my_cards")

	cards := newDeckFromFile("my_cards")
	// cards.print()

	cards.shuffle()
	cards.print()
	// // multiple return values from one fcn: both values (or variables) being returned are of type deck
	// hand, remainingCards := deal(cards, 5)

	// // cards.print()
	// hand.print()
	// remainingCards.print()

}
