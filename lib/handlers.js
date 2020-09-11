const todoStorage = require('./todoStorage');
const utils = require('./utils');

module.exports = {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    async getTodos(req, res) {
        let todos;
        try {
            todos = await todoStorage.getTodos();
        } catch (e) {
            utils.sendErrorResponse(res, 500, e);
            return;
        }
        utils.sendResponse(res, todos);
    },

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    async getTodo(req, res) {
        if (req.params.id === undefined) {
            utils.sendErrorResponse(res, 400, 'todo id is undefined');
            return;
        }
        let todo = await todoStorage.getTodo(req.params.id);
        if (todo === undefined) {
            utils.sendErrorResponse(res, 404, 'todo item not found');
        } else {
            utils.sendResponse(res, todo);
        }
    },

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    async postTodo(req, res) {
        if (req.body.title === undefined) {
            utils.sendErrorResponse(res, 400, 'missing todo title');
            return;
        } else if (req.body.description === undefined) {
            utils.sendErrorResponse(res, 400, 'missing todo description');
            return;
        }
        try {
            await todoStorage.addTodo(req.body.title, req.body.description);
        } catch (e) {
            console.error(e);
            utils.sendErrorResponse(res, 500, e);
            return;
        }
        res.status(200).send();
    },

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    async deleteTodo(req, res) {
        if (req.params.id === undefined) {
            utils.sendErrorResponse(res, 400, 'todo id is undefined');
            return;
        }
        try {
            await todoStorage.deleteTodo(req.params.id);
        } catch (e) {
            utils.sendErrorResponse(res, 500, e);
            return;
        }
        res.status(200).send();
    }
}