const log = (req, res, next) => {
    console.log(req.method, req.originalUrl, new Date().toLocaleDateString());
    next();

};

module.exports = log;