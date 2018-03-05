## Tips for Designing HTML Emails
0. HTML emails undergoes email clients preprocessor and browser rendering engine before content is loaded onto the webpage.

1. Use only <table></table> layout and inline CSS because email clients render HTML only and do not support external files like style.css. In other words, email clients remove any <link> tags and <style> tags.

2. Make sure to include any reset styles inline on every element we want to reset to counter any browser behavior. Inline styling has a higher specificity than certain email clients stylesheets.

3. Keep the layout simple. A complicated layout will more than likely cause errors with email clients.

4. For example, in a <p> tag, we want to include the container, font, and reset styles.

5. Images have to be hosted remotely.

Try to use "em" rather than "px" if you can. However, margin and padding are typically "px"

- Ems are becoming increasingly popular in web documents due to scalability and their mobile-device-friendly nature.

- Why do you have to use the TABLEs ? Why not just DIVs ?﻿
- emails can only use HTML4 and do not support HTML5 which introduced divs. Therefore the best way is to use tables﻿

**Generally, 1em = 12pt = 16px = 100%**

## Helpful Resources

https://kyleschaeffer.com/development/css-font-size-em-vs-px-vs-pt-vs/

Reset CSS
https://meyerweb.com/eric/tools/css/reset/

HTML Special Entities
http://htmlhelp.com/reference/html40/entities/special.html

Responsive HTML Email Template Tutorial
https://www.youtube.com/watch?v=7FcVjXkNH4g

How to create a Responsive HTML Email / Mailer ?
https://www.youtube.com/watch?v=N1kIM-OAJgc
