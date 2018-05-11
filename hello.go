
// every go source code file is part of a package. So declare it to be part of the main package, since this is a program meant to be ran in the command line.
package main 

// import format packet to format text and print it out in console. Must be in double quotes, not single quotes.
import "fmt"

// create function. Call a fcn from the fmt packet called Printf(), and pass a single argument
func main() {
	fmt.Printf("Hello, World\n")
}