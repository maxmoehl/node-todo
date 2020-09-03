const {v4: uuid} = require('uuid');

module.exports = {
    Todo: class {
        constructor(title, description) {
            this.title = title;
            this.description = description;
            this.uuid = uuid();
        }
    },

    todos: {},

    getTodos() {
        return this.todos;
    },

    addTodo(todo) {
        this.todos[todo.uuid] = todo;
    },

    getTodo(uuid) {
        return this.todos[uuid];
    },

    deleteTodo(uuid) {
        delete this.todos[uuid];
    }
}