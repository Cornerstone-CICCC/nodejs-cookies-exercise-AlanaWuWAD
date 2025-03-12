"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//create server
const app = (0, express_1.default)();
//MW
// app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//Routes
app.use('/', page_routes_1.default);
// 404
app.use((req, res) => {
    res.status(404).render('404');
});
//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is ${PORT}`);
});
