package main

import (
	"fmt"
	"net/http"
	"time"
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
		go checkLink(link, c) // only use `go`keyword in front of function calls, adding go is a function call or invocation.
	}

	// each step, which is a value coming through c, is blocking call. This means that for each step, the main routine is waiting to receive a message from checkLink() after the http.Get() has completed. Feels a little hackish, but we are just printing messages that is received from every completed Go routine.
	// for i := 0; i < len(links); i++ {
	// 	fmt.Println(<-c)
	// }

	// alternative way to write loop: watch the channel c, whenever a value comes out of it, assign that value to l, and the body of the for loop is executed, which starts a checkLink go routine.
	for l := range c {
		// add a function literal (or anonymous function) and invocation (), to place the Sleep statement between each GET requests. We initially didn't want to place it in the main routine or delay the checkLink() with a timer. We decided to use a function literal (equivalent to an anonymous fcn or lambda in Ruby), which is a block of code that can be executed in the future. The tricky part is making sure you pass the l argument from outside the function literal scope, when invoking the function literal. Instead of passing l directly into the function literal, which may lead to issues.
		go func(link string) {
			time.Sleep(5 * time.Second)
			checkLink(link, c)
		}(l) // extra set of parenthesis to invoke it, and pass l, which is a new copy in another memory address
		// don't try to access the same variable from a child routine. We only share information to a child routine as an argument or from a channel
	}
}

// serial link checking is not the most efficient because the http.Get() is a blocking call, which prevents our Go routine from continuing on. The preferred method would be to use Go routines to run GET request concurrently for each link, and returns whichever response comes first.
func checkLink(link string, c chan string) {
	_, err := http.Get(link) // returns a Response struct and error type, but we are only concerned about error type, which states whether or not the site is up. Not so much the response to the request.
	if err != nil {
		fmt.Println(link, "might be down!")
		c <- link
		// c <- "Might be down I think"
		return // make sure we don't do anything else inside the if statement
	}

	fmt.Println(link, "is up!")
	c <- link
	// c <- "Yep it's up"
}
