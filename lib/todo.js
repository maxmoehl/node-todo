const {v4: uuid} = require('uuid');

module.exports = class Todo{
    /**
     * A descriptive title
     */
    title
    /**
     * A more detailed description
     */
    description
    /**
     * A uuid to reliably identify Todo items
     */
    uuid

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.uuid = uuid();
    }
}