const storage = require('./storage');
const utils = require('./utils');

module.exports = {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    getTodos(req, res) {
        utils.sendResponse(res, storage.getTodos());
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
        utils.sendResponse(res, storage.getTodo(req.params.id));
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
        storage.addTodo(new storage.Todo(req.body.title, req.body.description));
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
        storage.deleteTodo(req.params.id);
        res.status(200).send();
    }
}