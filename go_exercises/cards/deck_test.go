package main

import (
	"os"
	"testing"
)

// capitalize first letter of all test functions. "t" in argument is the test handler, we notify the test handler, "t" value, what went wrong
func TestNewDeck(t *testing.T) {
	d := newDeck()

	if len(d) != 16 {
		t.Errorf("Expected deck length of 16, but got %v", len(d)) // length of d is injected in %v
	}

	if d[0] != "Ace of Diamonds" {
		t.Errorf("Expected first card to be Ace of Diamonds, but got %v", d[0])
	}

	if d[len(d)-1] != "Four of Spades" {
		t.Errorf("Expected last card to be Four of Spades, but got %v", d[len(d)-1])
	}
}

// need to take care of any cleanup manually by removing temporary testing file. Go will not do that for you.
func TestSaveToDeckAndNewDeckFromFile(t *testing.T) {
	os.Remove("_deckTesting") // underscore before filename means it's a temporary file

	d := newDeck()
	d.saveToFile("_deckTesting")

	loadedDeck := newDeckFromFile("_deckTesting")

	if len(loadedDeck) != 16 {
		t.Errorf("Expected deck length of 16, but got %v", len(loadedDeck))
	}
}
