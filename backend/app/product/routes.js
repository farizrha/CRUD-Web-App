const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController = require('./controller');

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.put('/product/:id', upload.single('image'), productController.update);
router.post('/product', upload.single('image'), productController.store);
router.delete('/product/:id', productController.destroy);

module.exports = router;