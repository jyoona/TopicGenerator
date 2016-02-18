
Topic Generator
----------------

Created February 2016

VERY SIMPLE widget for personal use.
Generates topics for you :)
You can add or delete topics as well.

Run on a localserver to use:
ex. php -S localhost:3104

Currently does not use a database or is not deployed online, so you must push to/pull from github if you want to apply/retrieve changes.


in case of needing to modify main.js, need to bundle:
	browserify -t reactify main.js -o bundle.js