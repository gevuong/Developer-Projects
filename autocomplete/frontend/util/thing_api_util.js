// may use fetch API from 'cross-fetch' or axios, or jquery. But jquery is a very large library to implemenet one ajax.
export const fetchAllThings = () => (
    $.ajax({
        method: 'GET',
        url: 'api/things',
    })
);

export const fetchTesting = (searchTerm) => (
    $.ajax({
        method: 'GET',
        url: `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=5`,
    })
);


// Only uncomment to test $ajax requests in console
window.fetchTesting = fetchTesting;
window.fetchAllThings = fetchAllThings;
