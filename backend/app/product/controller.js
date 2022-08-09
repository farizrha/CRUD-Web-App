const { ObjectID } = require('bson');
const db = require('../../config/mongodb');
const fs = require('fs');
const path = require('path');

const index = async (req,res) => {
    const {q} = req.query;
    const keys = ["name", "price"];
    const search = (data) => {
        return data.filter((item) => 
            keys.some((key) => item[key].toString().toLowerCase().includes(q))
        );
    };

    let data = await db.collection('products')
                        .find()
                        .toArray()
    try{
        res.send(search(data))
    }
    catch(err) {
        res.send(err);
    }
    
};

const view = (req,res) => {
    const {id} = req.params;
    db.collection('products').findOne({_id: ObjectID(id)})
        .then(result => res.send([result]))
        .catch(error => res.send(error));
};

const update = (req,res) => {
    const {id} = req.body;
    const {name} = req.body;
    const price = JSON.parse(req.body.price);
    const stock = JSON.parse(req.body.stock);
    const status = JSON.parse(req.body.status);

    db.collection('products').updateOne({_id: ObjectID(id)}, {$set: {name: name, price: price, stock: stock, status: status}})
        .then(result => res.send([result]))
        .catch(error => res.send(error));
};

const store = (req,res) => {
    const {name} = req.body;
    const price = JSON.parse(req.body.price)
    const stock = JSON.parse(req.body.stock)
    const status = JSON.parse(req.body.status)
    
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').insertOne({name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }else{
        db.collection('products').insertOne({name, price, stock, status})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    };
};

const destroy = (req,res) => {
    const {id} = req.params;
    db.collection('products').deleteOne({_id: ObjectID(id)})
        .then(result => res.send([result]))
        .catch(error => res.send(error));
};

module.exports = {
    index,
    view,
    update,
    store,
    destroy
}