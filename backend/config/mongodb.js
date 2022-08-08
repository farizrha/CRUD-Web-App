const {MongoClient} = require('mongodb');

const url = 'mongodb://eduwork:eduwork@localhost:27017?authSource=admin';
const client = new MongoClient(url, {
    useUnifiedTopoLogy: true
});

(async () => {
    try {
        await client.connect();
        console.log('koneksi ke mongodb berhasil');
    } catch(e) {
        console.log(e);;
    }
})();

const db = client.db('eduwork-native');

module.exports = db;