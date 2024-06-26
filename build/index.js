"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
var auth_route_1 = __importDefault(require("./routes/auth.route"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_route_1 = __importDefault(require("./routes/user.route"));
dotenv_1.default.config();
var port = process.env.PORT || 8081;
/** CORS */
var options = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: '*'
};
app.use((0, cors_1.default)(options));
/** Body Parser */
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
/** Router */
app.use('/api/auth', auth_route_1.default);
app.use('/api/user', user_route_1.default);
app.get("/", function (req, resp) {
    console.log("Hello Server");
    return resp.status(200).json({
        data: "Hello Wolrd"
    });
});
/** App Running */
app.listen(port, function () {
    console.log('UserAPI is runnning at ' + port);
});
