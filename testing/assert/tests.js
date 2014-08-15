var assert = require('assert'),
    Todo = require('./../todo');


var todo = new Todo(),
    testCompleted = 0;


function deleteTest() {
    todo.add('Delete Me');
    assert.equal(todo.count(), 1, "1 item should exist");
    todo.deleteAll();
    assert.strictEqual(todo.count(), 0, "No items should exist");
    testCompleted++;
}

function addTest() {
    todo.deleteAll();
    todo.add('Added');
    assert.notStrictEqual(todo.count(), 0, "1 item should exist");
    testCompleted++;
}

function doAsyncTest(cb) {
    todo.doAsync(function (value) {
        assert.ok(value, "Callback should be passed true");
        testCompleted++;
        cb();
    }(true));
}

function throwsTest() {
    assert.throws(todo.add, /requires/);
    testCompleted++;
}


deleteTest();
addTest();
throwsTest();
doAsyncTest(function () {
    console.log("Completed " + testCompleted + " tests");
});


