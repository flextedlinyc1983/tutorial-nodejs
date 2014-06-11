var fs = require('fs'),
    path = require('path'),
    args = process.argv.splice(2),
    command = args.shift(),
    taskDescription = args.join(' '),
    file = path.join(process.cwd(), '/.tasks');

switch (command) {
    case 'list':
        listTasks(file);
        break;

    case 'add':
        addTask(file, taskDescription);
        break;

    default :
        console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]');
}


function loadOrInitializeTaskArray(file, callback) {
    fs.exists(file, function (exists) {
        var tasks = [];
        if (exists) {
            fs.readFile(file, 'utf-8', function (err, data) {
                if (err) throw err;
                data = data.toString();
                var tasks = JSON.parse(data || '[]');
                callback(tasks);
            });
        } else {
            cb([]);
        }
    })
}


function listTasks(file) {
    loadOrInitializeTaskArray(file, function (tasks) {
        for (var i in tasks) {
            if (tasks.hasOwnProperty(i)) console.log(tasks[i]);
        }
    });
}

function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'urf-8', function (err) {
        if (err) throw err;
        console.log('Saved.');
    })
}

function addTask(file, taskDescription) {
    loadOrInitializeTaskArray(file, function (tasks) {
        tasks.push(taskDescription);
        storeTasks(file, tasks);
    });
}