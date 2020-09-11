const axios = require('axios')
const router = require('../lib/router');

describe('#newRouter()', () => {

    it('should post todo', (async () => {
        let server = router.newRouter().listen(8080);
        let resp = await axios.post('http://localhost:8080/todo',
            {
                'title': 'Test1',
                'description': 'Test Description'
            });
        if (resp.status !== 200) {
            server.close();
            throw 'received non 200 status code ' + resp.status;
        }
        server.close();
    }));

    it('should get todos', async () => {
        let server = router.newRouter().listen(8080);
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            server.close();
            throw 'received non 200 status code ' + resp.status;
        }
        server.close();
    });

    it('should get specific todo', async () => {
        let server = router.newRouter().listen(8080);
        await axios.post('http://localhost:8080/todo',{'title': 'Test1', 'description': 'Test Description'});
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            server.close();
            throw 'received non 200 status code ' + resp.status;
        }
        let todoId = resp.data.data[0].uuid;
        resp = await axios.get('http://localhost:8080/todos/' + todoId + '/');
        if (resp.status !== 200) {
            server.close();
            throw 'received non 200 status code ' + resp.status;
        }
        server.close();
    });

    it('should not get non-existing todo', async () => {
        let server = router.newRouter().listen(8080);
        try {
            await axios.get('http://localhost:8080/todos/not-existing');
        } catch (e) {
            if (e.response.status !== 404) {
                server.close();
                throw 'expected 404 status but got ' + e.response.statusCode;
            }
            server.close();
            return;
        }
        server.close();
        throw 'expected error but got none';
    });

    it('should reject incomplete todos', async () => {
        let server = router.newRouter().listen(8080);
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
                server.close();
                throw 'expected status 400 for missing description but got ' + e.response.statusCode;
            }
        }
        if (!error) {
            server.close();
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
                server.close();
                throw 'expected status 400 for missing title but got ' + e.response.statusCode;
            }
        }
        if (!error) {
            server.close();
            throw 'expected error for missing title but didn\'t get one';
        }
        server.close();
    });

    it('should delete todo', async () => {
        let server = router.newRouter().listen(8080);
        await axios.post('http://localhost:8080/todo',{'title': 'Test1', 'description': 'Test Description'});
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            server.close();
            throw 'received non 200 status code ' + resp.status;
        }
        let todoId = resp.data.data[0].uuid;
        resp = await axios.delete('http://localhost:8080/todos/' + todoId + '/');
        if (resp.status !== 200) {
            server.close();
            throw 'received non 200 status code ' + resp.status;
        }
        server.close();
    });
})