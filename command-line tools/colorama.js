var ansi = require('ansi');

var cursor = ansi(process.stdout);

cursor.
    fg.green().write("Hello").fg.reset().write("\n");