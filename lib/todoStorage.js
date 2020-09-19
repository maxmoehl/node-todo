const mongoose = require('mongoose');
const {v4: uuid} = require('uuid');

mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 1000
}, e => {
    if (e) throw e;
    console.log('Successfully connected');
});

const Todo = mongoose.model('Todo', new mongoose.Schema({
    uuid: String,
    title: String,
    description: String
}));

async function addTodo(title, description) {
    let t = new Todo();
    t.uuid = uuid();
    t.title = title;
    t.description = description;
    await t.save();
}

async function getTodos() {
    let docs = await Todo.find({});
    let todos = [];
    await docs.forEach(t => todos.push(t));
    return todos
}

async function getTodo(uuid) {
    let doc = await Todo.findOne({uuid: uuid});
    if (doc === null) {
        return undefined;
    } else {
        return {
            uuid: doc.uuid,
            title: doc.title,
            description: doc.description
        };
    }
}

async function deleteTodo(uuid) {
    await Todo.deleteOne({uuid: uuid});
}

/**
 * WARNING: This will disconnect mongoose from the database and no
 * more data can read or written.
 */
function closeConnection() {
    mongoose.connection.close();
}

module.exports = {
    addTodo,
    getTodos,
    getTodo,
    deleteTodo,
    closeConnection
}