const {verify} = require("jsonwebtoken");
require('dotenv').config();
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({error: 'Access denied'});
    }
    verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(403).json({error: 'Invalid token'});
        }
        req.user = user;
        next();
    });
}
exports.authenticateTokenAdminOnly = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({error: 'Access denied'});
    }
    verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err || user.role !== 'admin') {
            return res.status(403).json({error: 'Invalid token'});
        }
        next();
    });
}