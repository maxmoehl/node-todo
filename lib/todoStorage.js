const Todo = require('./todo');

module.exports = class TodoStorage {
    todos

    constructor() {
        this.todos = {};
    }

    /**
     * Stores a new Todo
     * @param t{Todo} item to add
     */
    addTodo(t) {
        this.todos[t.uuid] = t;
    }

    /**
     * Creates a copy of the internal object that stores todos and returns it
     * @return List of Todo items
     */
    getTodos() {
        let res = [];
        for (let key in this.todos) {
            if (Object.hasOwnProperty.call(this.todos, key)) {
                res.push(Object.assign(new Todo(), this.todos[key]));
            }
        }
        return res;
    }

    /**
     * Gets a single Todo item by its id
     * @param uuid{string} uuid of the Todo item to get
     */
    getTodo(uuid) {
        if (this.todos[uuid] === undefined) {
            return undefined;
        } else {
            return Object.assign(new Todo(), this.todos[uuid]);
        }
    }

    /**
     * Delete a single item from the storage
     * @param uuid{string} uuid of the Todo item to delete
     */
    deleteTodo(uuid) {
        delete this.todos[uuid];
    }
}