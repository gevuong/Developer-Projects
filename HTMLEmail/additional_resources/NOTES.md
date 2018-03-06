## Tips Discovered while Designing HTML Emails

1. HTML emails undergoes email clients preprocessor and browser rendering engine before content is loaded onto the webpage.

2. Use table layout and inline CSS because email clients render HTML only and do not support external files like style.css. In other words, email clients remove any link tags and style tags.

3. Make sure to include any reset styles inline on every element we want to reset to counter any browser behavior. Inline styling has a higher specificity than certain email clients stylesheets.

4. Keep the layout simple. A complicated layout will more than likely cause errors with email clients.

5. For example, in a <p> tag, we want to include the container, font, and reset styles.

6. Images have to be hosted remotely.

7. Try to use "em" rather than "px" if you can. However, margin and padding are typically "px"

- Ems are becoming increasingly popular in web documents due to scalability and their mobile-device-friendly nature. **However, I learned that some desktop emailers cannot recognize em format, like AOL Chrome on iOS.**

- Why do you have to use the TABLEs ? Why not just DIVs ?﻿
- emails can only use HTML4 and do not support HTML5 which introduced divs. Therefore the safe best way is to use tables﻿

**Generally, 1em = 12pt = 16px = 100%**


## Helpful Resources
![CSS Inliner Tool](https://templates.mailchimp.com/resources/inline-css/)

Universally Supported CSS and HTML for Email Designs
(http://www.pinpointe.com/blog/email-campaign-html-and-css-support)

em vs px vs pt
https://kyleschaeffer.com/development/css-font-size-em-vs-px-vs-pt-vs/

Reset CSS
(https://meyerweb.com/eric/tools/css/reset/)

HTML Special Entities
(http://htmlhelp.com/reference/html40/entities/special.html)

### YouTube Links
PSD to HTML & CSS (Series - Unresponsive) - Slicing and Saving Images
https://www.youtube.com/watch?v=aD1UYp9GMjs&list=PL4cUxeGkcC9jjVlRiZnRnAGFSCK3Lu_i-&index=2

Responsive HTML Email Template Tutorial
(https://www.youtube.com/watch?v=7FcVjXkNH4g)

![How to create a Responsive HTML Email / Mailer](/responsive_test.html)
(https://www.youtube.com/watch?v=N1kIM-OAJgc)
