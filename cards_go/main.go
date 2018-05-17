package main

func main() {

	// := syntax to create a slice of type deck. cards is now of type deck
	cards := newDeck()

	// remember both values are of type deck
	hand, remainingCards := deal(cards, 5)

	cards.print()
	hand.print()
	remainingCards.print()
}
