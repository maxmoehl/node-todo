const axios = require('axios')
const router = require('../lib/router');

describe('#newRouter()', () => {
    it('should post item', (async () => {
        let server = router.newRouter().listen(8080);
        let resp = await axios.get('http://localhost:8080/todos');
        if (resp.status !== 200) {
            throw 'received non 200 status code ' + resp.status;
        }
        server.close();
    }))
})