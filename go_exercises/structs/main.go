package main

import "fmt"

// custom type declarations person and contactInfo
type person struct {
	firstName   string
	lastName    string
	contactInfo // equivalent to contactInfo contactInfo
}

type contactInfo struct {
	email   string
	zipCode int
}

func main() {
	jim := person{
		firstName: "Jim",
		lastName:  "Party",
		contactInfo: contactInfo{
			email:   "jim@gmail.com",
			zipCode: 94123,
		},
	}

	// jimPointer := &jim
	// fmt.Println(&jim)
	// jim is of type person, while jimPointer or *person is a pointer, or memory address, to a person
	jim.updateName("jimmy")
	jim.print()
}

// pointerToPerson is the memory address that "jim" is located at. This gives direct access to the value that is stored in that memory address, which is jim struct.
func (pointerToPerson *person) updateName(newFirstName string) {
	(*pointerToPerson).firstName = newFirstName
}

// receiver fcn that accepts a receiver of type person, which is an extension of type struct
func (p person) print() {
	// fmt.Println(p)
	fmt.Printf("%+v", p)
}
