1. Create a responsive (phone, tablet, desktop) web application that allows the user to quick filter a list of things.

2. The top of the page will have a search input field and then below that a list of things in response to the filter.

3. The things should be sorted alphabetically.

4. The things could be anything, but should be AJAX pulled from a backend service that you write and should ultimately be pulled from an open public API.

Tips: use this test to show off your skill set and what you can bring to the team. You will be critiqued on your quality, completeness, creativity, and technologies.

Choose **modern** technologies that exercise the breadth of approach and ones that you’re comfortable developing with.


# Consider adding a cache layer (Memcached or Redis) to prevent having to query DB every time.
# Import fetch from 'cross-fetch'. You don't need a large library like jQuery if all you're going to do is make an AJAX.

MVPs
# Add auto suggestions (autocomplete) dropdown below search bar (limit 7).
# Use pagination to prevent rendering thousands of data on single page.

Steps to Improve User Experience
# Show Search Progress (i.e. React/CSS Spinner)
# Add independent Search or Magnifying Glass button to right of Search Bar.
# Don't return "no results", but alternatives or explanation
# Provide filter and sort options
