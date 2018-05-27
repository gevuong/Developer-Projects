package main

import "fmt"

// custom type declarations person and
type person struct {
	firstName string
	lastName  string
	contact   contactInfo
}

type contactInfo struct {
	email   string
	zipCode int
}

// Third method to declare a struct to have zero values in place:
func main() {
	jim := person{
		firstName: "Jim",
		lastName:  "Party",
		contact: contactInfo{
			email:   "jim@gmail.com",
			zipCode: 94123,
		},
	}

	fmt.Println(jim)
	fmt.Printf("%+v", jim)
}
