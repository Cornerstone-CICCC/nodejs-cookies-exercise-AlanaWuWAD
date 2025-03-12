"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pageRouter = (0, express_1.Router)();
const users = [
    { id: 1, username: 'john', password: '123' },
    { id: 2, username: 'mary', password: '345' }
];
//Display home page
pageRouter.get('/', (req, res) => {
    res.status(200).render('index');
});
//Display login form
pageRouter.get('/login', (req, res) => {
    res.status(200).render('login');
});
//login user with login details
pageRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(404).redirect('/login');
    }
    res.cookie('isLoggedIn', true, {
        maxAge: 5 * 60 * 1000, // 5min
        httpOnly: true,
        signed: true //cookie is stored in signedCookie obj
    });
    res.cookie('username', username, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    });
    res.status(200).redirect('/admin');
});
//register new user
pageRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
        res.status(409).json({ message: 'Username is taken!' });
        return;
    }
    users.push({
        id: users.length + 1,
        username,
        password
    });
    res.cookie('isLoggedIn', true, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    });
    res.cookie('username', username, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    });
    res.status(201).redirect('/admin');
});
//log out user
pageRouter.get('/logout', (req, res) => {
    res.clearCookie('isLoggedIn');
    res.clearCookie('username');
    res.clearCookie('message');
    res.status(301).redirect('/login');
});
//get username from cookie
pageRouter.get('/check', auth_middleware_1.checkAuth, (req, res) => {
    const { username } = req.signedCookies;
    const { message } = req.cookies;
    res.status(200).json({ username, message });
});
//display protected admin page
pageRouter.get('/admin', auth_middleware_1.checkAuth, (req, res) => {
    res.status(200).render('/admin');
});
exports.default = pageRouter;
