const Todo = require('../lib/todo')
const TodoStorage = require('../lib/todoStorage');
const assert = require('assert');

describe('#addTodo(Todo)', () => {
    it('should store item', (done) => {
        let s = new TodoStorage();
        if (s.addTodo(new Todo("Hello", "World")) === undefined) {
            done();
        }
    });
    it('should get item', (done) => {
        let s = new TodoStorage();
        s.addTodo(new Todo("Hello", "World"))
        if (s.getTodos().length === 1) {
            done();
        } else {
            done('expected one todo item but got ' + s.getTodos().length);
        }
    });
})