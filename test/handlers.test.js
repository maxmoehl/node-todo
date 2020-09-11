const axios = require('axios')
const router = require('../lib/router');

describe('#newRouter()', () => {
    it('should post item', (async done => {
        let server = router.newRouter().listen(8080);
        try {
            let resp = await axios.get('http://localhost:8080/todos');
        } catch (e) {
            done(e);
            server.close();
            return;
        }
        server.close();
        done();
    }))
})