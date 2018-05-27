package main

import "testing"

// capitalize first letter of all test functions. "t" in argument is the test handler, we notify the test handler, "t" value, what went wrong
func TestNewDeck(t *testing.T) {
	d := newDeck()

	if len(d) != 16 {
		t.Errorf("Expected deck length of 16, but got %v", len(d)) // length of d is injected in %v
	}
}
