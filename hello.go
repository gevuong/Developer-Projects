
// every go source code file is part of a package. In this case, declare it to be part of the main package because main packages are meant to be ran in the command line. You can define your own package.
package main 

// import format packet to format text and print it out in console. Must be in double quotes, not single quotes.
import "fmt"

// how to import multiple packages or libraries. You will encounter a "Compile Error: imported and not used" if you don't end up using a package you imported. Unlike other languages, you can accumulate unused library imports, so Go doesn't allow that, to reduce compilation time.
import {
	"fmt"
	"math" 
}

// constant variables or fcns named with a capital letter are exported from your package and are visible to other packages. If constant variable or fcn begins with a lower case, it'll be unexported, meaning you can't use it from other packages. If variable is not ready for public use, then name it with a lower case letter.
const English = "Welcome"
const klingon = "yI'el"

var myNumber = 1.23

// create function. Call a fcn from the fmt packet called Printf(), and pass a single argument. Keep in mind roundedUp variable scoped, meaning they
func main() {
	roundedUp := math.Ceil(myNumber) // round to next whole number
	roundedDown := math.Floor(myNumber)

	fmt.Println(roundedUp, roundedDown)
	fmt.Printf("Hello, World\n")

}