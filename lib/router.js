const cookieParser = require('cookie-parser');
const express = require('express');
const handlers = require('./handlers');

module.exports = {
    /**
     * Creates a new express app and registers all routes
     * and middlewares to it.
     *
     * @returns {Express}
     */
    newRouter() {
        const app = express();

        app.use(cookieParser())
        app.use(express.json())

        app.get('/todos', handlers.getTodos);
        app.get('/todos/:id', handlers.getTodo);
        app.post('/todo', handlers.postTodo);
        app.delete('/todos/:id', handlers.deleteTodo);

        return app;
    }
}