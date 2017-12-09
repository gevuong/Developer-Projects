## NOTES
### How to import .js files into main.js using vanillaJS?
- The old versions of JavaScript had no import, include, or require, so many different approaches to this problem have been developed. But recent versions of JavaScript have standards like ES6 modules to import modules, although this is not supported yet by most browsers.
- Use script tags in index.html. The order matters. saved images in img dir successfully loads as well.
https://stackoverflow.com/questions/11248657/how-to-import-include-source-files-in-javascript
https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file

- specifying "type" attribute in script tag is optional in HTML5, but mandatory in HTML4.

- If I try to include `type=module` in script tag to use ES6 module syntax (which is compatible in Chrome 61 or later) to utilize module import/export JS files to other JS files, I get following error in Chrome:
`Access to Script at 'file:///Volumes/PATRIOT/CS/CodingProjects/SuperMarioBros/public/js/main.js' from origin 'null' has been blocked by CORS policy: Invalid response. Origin 'null' is therefore not allowed access.`
