var jade = require('jade'),
    fs = require('fs');

var templateFile = './templates/page.jade';
var iterTemplate = fs.readFileSync(templateFile);

var context = { messages: [
    'You have logged in successfully',
    'Welcome back!'
]};

var iterFn = jade.compile(
    iterTemplate,
    {filename: templateFile}
);

console.log(iterFn(context));