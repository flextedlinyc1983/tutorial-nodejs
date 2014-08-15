var vows = require('vows'),
    assert = require('assert');

var Todo = require('../todo');


vows.describe('Todo').addBatch({
    'when adding an item': {
        topic: function () {
            var todo = new Todo();
            todo.add('Feed my cat');
            return todo;
        },
        'it should exist in my todos': function (err, todo) {
            assert.equal(todo.count(), 1);
        }
    }
}).run(); // if you run tests by using: npm tests.js
//}).export(module); // if you run tests by using: vows tests.js
