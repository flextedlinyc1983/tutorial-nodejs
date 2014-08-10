function Todo() {
    this.todos = [];
}

/**
 * Add a to-do item.
 * @param item
 */
Todo.prototype.add = function (item) {
    if (!item) throw new Error('Todo#add requires an item');
    this.todos.push(item);
};

/**
 * Delete all to-do items.
 */
Todo.prototype.deleteAll = function () {
    this.todos = [];
};

/**
 * Get count of to-do items.
 */
Todo.prototype.count = function () {
    return this.todos.length;
};

/**
 * Call back after two seconds.
 * @param cb
 */
Todo.prototype.doAsync = function (cb) {
    setTimeout(cb, 2000);
};


module.exports = Todo;

