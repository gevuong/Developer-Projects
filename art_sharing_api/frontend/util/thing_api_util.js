// may use fetch API from 'cross-fetch' or axios, or jquery. But jquery is a very large library to implemenet one ajax.
export const fetchAllThings = () => (
    $.ajax({
        method: 'GET',
        url: 'api/fetches',
    }).then(
        data => console.log(data),
        error => console.log(error)
    )
);

// uncomment for testing on console
window.fetchAllThings = fetchAllThings;
