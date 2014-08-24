var hogan = require('hogan.js');
var md = require('marked');

var template = '{{_markdown}}'
    + '**Name**: {{name}}'
    + '{{/markdown}}';

var context = {
    name: 'Rick LaRue',
    _markdown: function () {
        return function (text) {
            return md.parse(text);
        };
    }
};

template = hogan.compile(
    template,
    {sectionTags: [
        {o: '_markdown', c: 'markdown'}
    ]}
);
console.log(template.render(context));