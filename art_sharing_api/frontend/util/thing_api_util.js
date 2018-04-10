// alternatives for future optimization: fetch API from 'cross-fetch' or Axios. However, fetchAPI is not compatible with all browsers. Don't need large library like jquery to implemenet one ajax function.
export const fetchAllCampgrounds = () => (
    $.ajax({
        method: 'GET',
        url: '/api/fetches',
    })
);
