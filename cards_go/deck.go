package main

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"strings"
	"time"
)

// create a new type of 'deck', which is a slice of string, or string slice
type deck []string // this means that type deck === []string

// create and return a list of playing cards, or an array of strings. Remember to specify the return type, which in this case is of type deck. need to tell Go exactly what data type function is going to return. In this case, it would return a string. This means that whenever newCard() is called, it is going to return a value of type string.
func newDeck() deck {
	cards := deck{}

	cardSuits := []string{"Diamonds", "Clubs", "Hearts", "Spades"}
	cardValues := []string{"Ace", "Two", "Three", "Four"}

	// we input "_" to notify we're not using index in for loop
	for _, suit := range cardSuits {
		for _, value := range cardValues {

			// append() add ons a new string, does not modify existing string, but returns a new slice
			cards = append(cards, value+" of "+suit)
		}
	}

	return cards
}

// create a receiver on print(), or "instance method" called print(), that loops through deck of cards and prints each card. This means that any variable of type "deck" now gets access to print method. What does "d deck" mean? d is the variable containing copy of deck that can be used within function, it's like the instance of the deck variable that we're working with, or "self" in Ruby or "this" in Python. If you still don't get it, in main.go, "cards" is essentially the d variable in this case. "deck" is the type that we want to attach the print() method to.
// print() takes a receiver of a deck, allowing us to call cards.print()
func (d deck) print() {

	// assign index and value of every element in cards slice to the variables, idx and card.
	for idx, card := range d {
		fmt.Println(idx, card)
	}
}

// two arguments "d deck" is the existing list of cards. Return two values from deal fcn of type deck (i.e. (deck, deck))
func deal(d deck, handSize int) (deck, deck) {
	return d[:handSize], d[handSize:] // return dealed cards, and remaining
}

// receiver fcn that turns a deck into a slice of string, then join slice of string by commas
func (d deck) toString() string {
	return strings.Join([]string(d), ",")
}

// create receiver fcn so we can call cards.saveToFile(). 0666 is usually the default permission, which means anyone can read and write to file.
// For more info on ioutil.WriteFile, https://golang.org/pkg/io/ioutil/#WriteFile
func (d deck) saveToFile(filename string) error {
	return ioutil.WriteFile(filename, []byte(d.toString()), 0666)
}

// error is its own type if you're wondering. If nothing went wrong, error will have a value of 'nil', meaning no value. This function turns a []byte (byte slice) into a type deck
func newDeckFromFile(filename string) deck {
	byteSlice, err := ioutil.ReadFile(filename) // docs states ReadFile returns to values ([]byte, error)
	if err != nil {
		// Option 1: log error and return a call to newDeck()
		// Option 2: log error and quit the program
		fmt.Println("Error: ", err) // Go with Option 2
		os.Exit(1)                  // non-zero indicates error: more info: https://golang.org/pkg/os/#Exit
	}

	// string(byteSlice) is how you convert []byte to string
	sliceStrings := strings.Split(string(byteSlice), ",") // more info: https://golang.org/pkg/strings/#Split

	// convert slice of string to deck type. Remember that we defined type 'deck' as a string slice.
	return deck(sliceStrings)
}

// randomize order of cards, won't return anything
func (d deck) shuffle() {
	// type Rand is a source of random numbers. If we create a value of type Rand, we have the ability to specify the seed, or source of randomness for our number generator.
	// To make a value of type Rand, and to make a source, we have to call newSource() and passing in a random int64 number, and pass source to our random number generator
	// In summary: we're using current time in nanoseconds to generate a new int64 number every time we start the program. We use that as the "seed" to generate a new source object, and we use that source object as the basis for our new random number generator.
	source := rand.NewSource(time.Now().UnixNano()) // https://golang.org/pkg/math/rand/#Source
	r := rand.New(source)                           // r is random number generator of type Rand

	for idx := range d {
		newPosition := r.Intn(len(d) - 1) // if you have a value of type Rand, you can call Intn https://golang.org/pkg/math/rand/#Rand.Intn

		d[idx], d[newPosition] = d[newPosition], d[idx] // swap elements at both idx and
	}

}
