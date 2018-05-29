package main

import (
	"fmt"
	"io"
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
	// bs := make([]byte, 99999) // create empty byte slice with 99,999 empty elements
	// resp.Body.Read(bs)        // get Body property off of the Response struct, which is the value that implements the Reader interface, which has access to the Read fcn.
	// fmt.Println(string(bs))   // a []byte is essentially a string

	// shorthand for three lines coded above. resp.Body, the Body field of the Response struct implements the Reader interface. os.Stdout is a value that implements the Writer interface. Stdout is of type File, and File has a function called "Write". Therefore, it implements the 'Write' interface. The Copy() is pulling data out of the source that implements the Reader, and then passing all the data inside of it to the Writer. In short, the Copy() is basically piping information from one source (src) to one destination (dst).
	io.Copy(os.Stdout, resp.Body) // https://golang.org/pkg/io/#Copy
	// fmt.Println(resp)
}
