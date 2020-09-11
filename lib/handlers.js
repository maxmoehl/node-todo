const Todo = require('./todo');
const TodoStorage = require('./todoStorage');
const utils = require('./utils');

// TODO replace this with proper access to some sort of database (mongo db?)
// mongodb would also be available in github actions so that should be a good idea
global.storage = new TodoStorage();

module.exports = {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    getTodos(req, res) {
        utils.sendResponse(res, global.storage.getTodos());
    },

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    getTodo(req, res) {
        if (req.params.id === undefined) {
            utils.sendErrorResponse(res, 400, 'todo id is undefined');
            return;
        }
        let todo = global.storage.getTodo(req.params.id);
        if (todo === undefined) {
            utils.sendErrorResponse(res, 404, 'todo item not found');
        } else {
            utils.sendResponse(res, global.storage.getTodo(req.params.id));
        }
    },

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    postTodo(req, res) {
        if (req.body.title === undefined) {
            utils.sendErrorResponse(res, 400, 'missing todo title');
            return;
        } else if (req.body.description === undefined) {
            utils.sendErrorResponse(res, 400, 'missing todo description');
            return;
        }
        global.storage.addTodo(new Todo(req.body.title, req.body.description));
        res.status(200).send();
    },

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    deleteTodo(req, res) {
        if (req.params.id === undefined) {
            utils.sendErrorResponse(res, 400, 'todo id is undefined');
            return;
        }
        global.storage.deleteTodo(req.params.id);
        res.status(200).send();
    }
}