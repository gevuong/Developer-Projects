package main

import "fmt"

// create a map with keys and values as strings
func main() {
	// second method to create a map
	// var colors map[string]string

	// third method to create a map using make()
	colors := make(map[int]string)

	// first method to create a map
	// colors := map[string]string{
	// 	"red":   "#ff0000",
	// 	"green": "00ff00",
	// }

	colors[10] = "#ffffff"

	// use delete() to remove keys and values off of existing map
	delete(colors, 10)

	fmt.Println(colors)
}
