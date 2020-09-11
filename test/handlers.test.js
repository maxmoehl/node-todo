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
            throw 'received non 200 status code ' + resp.status;
        }
        server.close();
    }));
    it('should get todos', async () => {
        let server = router.newRouter().listen(8080);
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
        server.close();
    });
    it('should get specific todo', async () => {
        let server = router.newRouter().listen(8080);
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
        let todoId = resp.data.data[0].uuid;
        resp = await axios.get('http://localhost:8080/todos/' + todoId + '/');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
        server.close();
    });
})