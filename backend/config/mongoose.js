const mongoose = require('mongoose');

mongoose.connect('mongodb://eduwork:eduwork@localhost:27017?authSource=admin');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Server database terhubung'));