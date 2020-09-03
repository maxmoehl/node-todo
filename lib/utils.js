module.exports = {
    /**
     *  Sends a response to the client with status code 200 and
     *  the proper Content-Type header
     *
     * @param res {Response}
     * @param content {Object}
     */
    sendResponse(res, content) {
        res.status(200).json({
            data: content
        });
    },

    /**
     * Sends a error message as response to the client. The information gets
     * encoded as json, appropriate headers and status codes will also be
     * set.
     *
     * @param res {Response}
     * @param code {number}
     * @param message {string}
     */
    sendErrorResponse(res, code, message) {
        res.status(code).json({
            status: code,
            message: message
        });
    },

    /**
     * Validates JWT tokens in the headers
     *
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    authorizationMiddleware(req, res, next) {
       //TODO implement this
    }
}