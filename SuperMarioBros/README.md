## NOTES
### Issue#0 encountered: Import js files into main.js using vanillaJS
- The old versions of JavaScript had no import, include, or require, so many different approaches to this problem have been developed. But recent versions of JavaScript have standards like ES6 modules to import modules, although this is not supported yet by most browsers.

### Solution
- Use script tags in index.html. Order matters, saved images in img dir successfully loads as well.
https://stackoverflow.com/questions/11248657/how-to-import-include-source-files-in-javascript
https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file

- specifying "type" attribute in script tag is optional in HTML5, but mandatory in HTML4.

### Issue#1 encountered: Including "type=module" to script tag
-  If I include `type=module` in script tag to use ES6 module syntax (which is compatible in Chrome 61 or later) to utilize module import/export, I get following error in Chrome when running the index.html file:
`Access to Script at 'file:///Volumes/PATRIOT/CS/CodingProjects/SuperMarioBros/public/js/main.js' from origin 'null' has been blocked by CORS policy: Invalid response. Origin 'null' is therefore not allowed access.`

- Unlike regular scripts, ES6 modules are subject to same-origin policy. This means that you cannot import them from the file system or cross-origin without a CORS header (which cannot be set for local files).

Basically you need to run this code from a (local) server or disable same-origin in the browser for testing (do not do this permanently)

### Solution (workaround) to CORS policy issue:
- https://stackoverflow.com/questions/46992463/es6-module-support-in-chrome-62-chrome-canary-64-does-not-work-locally-cors-er
