package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

type logWriter struct{}

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

	// pass in our own type logWriter to Copy(). logWriter satifies the Writer interface, and can implement the Write fcn.
	lw := logWriter{}

	// shorthand for three lines coded above. resp.Body, the Body field of the Response struct implements the Reader interface. os.Stdout is a value that implements the Writer interface. Stdout is of type File, and File has a function called "Write". Therefore, it implements the 'Write' interface. The Copy() is pulling data out of the source that implements the Reader, and then passing all the data inside of it to the Writer. In short, the Copy() is basically piping information from one source (src) to one destination (dst).
	io.Copy(lw, resp.Body) // https://golang.org/pkg/io/#Copy
}

// implement my own custom Write fcn that implements the Writer interface to test understanding of standard documentation. Fcn should return an int, which is the number of bytes written or processed from the []byte. Remember, by just defining the Write() fcn, and associating it with logWriter, the logWriter is now implementing the Writer interface (https://golang.org/pkg/io/#Writer). Because logWriter has a fcn called Write that receives a []byte argument, and returns an int and error.
func (logWriter) Write(bs []byte) (int, error) {
	fmt.Println(string(bs))
	fmt.Println("Just wrote this many bytes:", len(bs))
	return len(bs), nil
}
