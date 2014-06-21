var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/tasks'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
    project: String,
    description: String
});
var Task = mongoose.model('Task', TaskSchema);
var task = new Task();

task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function (err) {
    if (err) throw err;
    console.log('Task saved.');
});

Task.find({project: 'Bikeshed' }, function (err, tasks) {

    var len = tasks.length;
    for (var i = 0; i < len; ++i) {
        var task = tasks[i];
        console.log('ID: ' + task._id);
        console.log(task.description);
    }
//    mongoose.disconnect();
});

Task.update(
    {_id: '53a58e6ff53e001860da4bfb'},
    {description: 'Paint the bikeshed green.'},
    {multi: false},
    function (err, rowsUpdated) {
        if (err) throw err;
        console.log('Updated');
    }
);


Task.findById('53a58e6ff53e001860da4bfb', function (err, task) {
    task.remove();
});