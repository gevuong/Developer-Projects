package main

import (
	"fmt"
	"net/http"
)

func main() {
	links := []string{
		"http://google.com",
		"http://facebook.com",
		"http://stackoverflow.com",
		"http://golang.org",
		"http://amazon.com",
	}

	// create a brand new channel, c, using make(), which creates a value out of a given type.
	c := make(chan string)

	// multiple go routines are uploaded or scheduled.
	for _, link := range links {
		go checkLink(link, c) // only use `go` keyword in front of function calls
	}

	// each step, which is a value coming through c, is blocking call. This means that for each step, the main routine is waiting to receive a message from checkLink() after the http.Get() has completed. Feels a little hackish, but we are just printing messages that is received from every completed Go routine.
	for i := 0; i < len(links); i++ {
		fmt.Println(<-c)
	}
}

// serial link checking is not the most efficient because the http.Get() is a blocking call, which prevents our Go routine from continuing on. The preferred method would be to use Go routines to run GET request concurrently for each link, and returns whichever response comes first.
func checkLink(link string, c chan string) {
	_, err := http.Get(link) // returns a Response struct and error type, but we are only concerned about error type, which states whether or not the site is up. Not so much the response to the request.
	if err != nil {
		fmt.Println(link, "might be down!")
		c <- "Might be down I think"
		return // make sure we don't do anything else inside the if statement
	}

	fmt.Println(link, "is up!")
	c <- "Yep it's up"
}
