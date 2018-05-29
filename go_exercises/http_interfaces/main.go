package main

import (
	"fmt"
	"net/http"
	"os"
)

// GET request returns a pointer (*Response) to a type response (or response object), not the response value. https://golang.org/pkg/net/http/#Get
func main() {
	resp, err := http.Get("http://google.com")

	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	// response body takes the []byte, and read that data, which is HTML into []byte. We then print []byte. The Read() is going to take some source of data, the actual HTML data stored inside of the request, and store all that data into bs, which is an empty []byte, until []byte is full.
	bs := make([]byte, 99999) // create empty byte slice with 99,999 empty elements
	resp.Body.Read(bs)        // get Body property off of the Response struct, which is the value that implements the Reader interface, which has access to the Read fcn.
	fmt.Println(string(bs))   // a []byte is essentially a string

	// fmt.Println(resp)
}
