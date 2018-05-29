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

	for _, link := range links {
		checkLink(link)
	}
}

func checkLink(link string) {
	_, err := http.Get(link) // returns a Response struct and error type, but we are only concerned about error type, which states whether or not the site is up. Not so much the response to the request.
	if err != nil {
		fmt.Println(link, "might be down!")
		return // make sure we don't do anything else inside the if statement
	}

	fmt.Println(link, "is up!")
}
