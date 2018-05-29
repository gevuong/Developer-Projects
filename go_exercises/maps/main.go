package main

import "fmt"

// create a map with keys and values as strings
func main() {
	// first method to create a map
	colors := map[string]string{
		"red":   "#ff0000",
		"green": "#00ff00",
		"white": "#ffffff",
	}

	printMap(colors)
}

// c is argument name, type is map
func printMap(c map[string]string) {
	for color, hex := range c { // color, hex are key, value for each step through loop
		fmt.Println("hex code for", color, "is", hex)
	}
}
