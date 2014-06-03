var fs = require('fs');

var completedTask = 0,
    tasks = [],
    wordCounts = {},
    filesDir = './text';


function checkIfComplete() {
    completedTask++;

    if (completedTask === tasks.length) {
        for (var index in wordCounts) {
            if (wordCounts.hasOwnProperty(index)) {
                console.log(index + ': ' + wordCounts[index]);
            }
        }
    }
}


function countWordsInText(text) {
    var words = text.toString().toLowerCase().split(/\W+/).sort();
    for (var index in words) {
        if (words.hasOwnProperty(index)) {
            var word = words[index];
            if (word) {
                wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
            }
        }
    }
}

fs.readdir(filesDir, function (err, files) {
    if (err) throw err;
    for (var index in files) {
        if (files.hasOwnProperty(index)) {
            var task = (function (file) {
                return function () {
                    fs.readFile(file, function (err, text) {
                        if (err) throw err;
                        countWordsInText(text);
                        checkIfComplete();
                    });
                }
            })(filesDir + '/' + files[index]);
            tasks.push(task);
        }
    }
    for (var task in tasks) {
        if (tasks.hasOwnProperty(task)) {
            tasks[task]();
        }
    }
});