package main

import "fmt"

// create a custom type "bot", where if you are a type with a fcn getGreeting() that returns a string, then you are a member of type "bot". Because you are a member of type "bot", you can call printGreeting(). We used interface to define what functions and return values it should have.
type bot interface {
	getGreeting() string
}

type englishBot struct{}
type spanishBot struct{}

func main() {
	eb := englishBot{}
	sb := spanishBot{}

	printGreeting(eb)
	printGreeting(sb)
}

func printGreeting(b bot) {
	fmt.Println(b.getGreeting())
}

// can remove receiver variable if it's not being used i.e. (eb englishBot) -> (englishBot)
func (englishBot) getGreeting() string {
	return "Hi there!"
}

func (spanishBot) getGreeting() string {
	return "Hola hay!"
}
