// To run this file in CLI: go run hello_world.go.

// package main defines a package that can be compiled and then "executed". You must have a func called 'main'.
package main

// give my package main, access to all the code and functionality that is contained inside another package "fmt". "fmt" is a standard library package in Go. You can also import custom, reusable packages that are authored and published my other engineers. Must be in double quotes. Visit golang.org/pkg to see all standard library packages.
import "fmt"

func main() {
	fmt.Println("Hi there!")
}
