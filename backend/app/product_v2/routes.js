const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const Product = require('./model');
const fs = require('fs');
const path = require('path');

router.put('/product/:id', upload.single('image'), (req, res) => {
    const {id} = req.params;
    const {name, price, stock, status} = req.body;
    const image = req.file;
    
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.updateOne({_id: id}, {$set: {name: name, price: price, stock: stock, status: status}, image_url: `http://localhost:3000/public/${image.originalname}`})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }else {
        Product.updateOne({_id: id}, {$set: {name: name, price: price, stock: stock, status: status}})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    };
});

router.post('/product', upload.single('image'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.create({name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    } else {
        Product.create({name, price, stock, status})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }
});

router.get('/product', async (req, res) => {
    const {q} = req.query;
    const keys = ["name", "price"];
    const search = (data) => {
        return data.filter((item) => 
            keys.some((key) => item[key].toString().toLowerCase().includes(q))
        );
    };

    let data = await Product.find()

    try{
        res.send(search(data));
    }
    catch{
        res.send(err);
    }
});

router.get('/product/:id', (req, res) => {
    const {id} = req.params;
    Product.find({ _id: id })
        .then(result => res.send(result))
        .catch(error => res.send(error));
});

router.delete('/product/:id' , (req, res) => {
    const {id} = req.params;
    Product.deleteOne({ _id: id })
        .then(result => res.send(result))
        .catch(error => res.send(error));
})

module.exports = router;