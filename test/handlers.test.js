const axios = require('axios')
const router = require('../lib/router');
const todoStorage = require('../lib/todoStorage')

let server;

before(async () => {
    server = router.newRouter().listen(8080);
    if (server === undefined) {
        throw 'server === undefined after server setup';
    }
});

after(async () => {
    server.close();
    todoStorage.closeConnection();
})

describe('#newRouter()', () => {

    it('should post todo', async () => {
        let resp = await axios.post('http://localhost:8080/todo',
            {
                'title': 'Test1',
                'description': 'Test Description'
            });
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
    });

    it('should get todos', async () => {
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
    });

    it('should get specific todo', async () => {
        await axios.post('http://localhost:8080/todo', {'title': 'Test1', 'description': 'Test Description'});
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
        let todoId = resp.data.data[0].uuid;
        resp = await axios.get('http://localhost:8080/todos/' + todoId + '/');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
    });

    it('should not get non-existing todo', async () => {
        try {
            await axios.get('http://localhost:8080/todos/not-existing');
        } catch (e) {
            if (e.response.status !== 404) {
                throw 'expected 404 status but got ' + e.response.statusCode;
            }
            return;
        }
        throw 'expected error but got none';
    });

    it('should reject incomplete todos', async () => {
        // First a missing description
        let error = false;
        try {
            await axios.post('http://localhost:8080/todo',
                {
                    'title': 'Test1'
                });
        } catch (e) {
            error = true;
            if (e.response.status !== 400) {
                throw 'expected status 400 for missing description but got ' + e.response.statusCode;
            }
        }
        if (!error) {
            throw 'expected error for missing description but didn\'t get one';
        }
        // Second a missing title
        error = false;
        try {
            await axios.post('http://localhost:8080/todo',
                {
                    'description': 'This is a test'
                });
        } catch (e) {
            error = true;
            if (e.response.status !== 400) {
                throw 'expected status 400 for missing title but got ' + e.response.statusCode;
            }
        }
        if (!error) {
            throw 'expected error for missing title but didn\'t get one';
        }
    });

    it('should delete todo', async () => {
        await axios.post('http://localhost:8080/todo', {'title': 'Test1', 'description': 'Test Description'});
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
        let todoId = resp.data.data[0].uuid;
        resp = await axios.delete('http://localhost:8080/todos/' + todoId + '/');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
    });
})