"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedOut = exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { isLoggedIn } = req.signedCookies;
    if (!isLoggedIn) {
        res.status(403).render('forbidden');
        return;
    }
    next();
};
exports.checkAuth = checkAuth;
const isLoggedOut = (req, res, next) => {
    const { isLoggedIn } = req.signedCookies;
    if (isLoggedIn) {
        res.status(301).redirect('/admin');
        return;
    }
    next();
};
exports.isLoggedOut = isLoggedOut;
