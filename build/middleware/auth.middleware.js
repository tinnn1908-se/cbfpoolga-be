"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var AuthMiddleWare = /** @class */ (function () {
    function AuthMiddleWare() {
    }
    AuthMiddleWare.authenToken = function (request, response, next) {
        var authorizationHeader = request.headers['authorization'] !== undefined ? request.headers['authorization'] : '';
        var token = authorizationHeader.split(' ')[1];
        console.log('token : ' + token);
        if (!token) {
            var secretKey = process.env.ACCESS_TOKEN_SECRET;
            if (secretKey) {
                jsonwebtoken_1.default.verify(token, secretKey, function (err, data) {
                    if (err)
                        response.sendStatus(401);
                    next();
                });
            }
        }
    };
    AuthMiddleWare.generateToken = function (user) {
        var secretKey = process.env.ACCESS_TOKEN_SECRET;
        var accessToken = '';
        if (secretKey) {
            accessToken = jsonwebtoken_1.default.sign({ user: user }, secretKey, {
                expiresIn: '3600s'
            });
        }
        return accessToken;
    };
    AuthMiddleWare.generateRefreshToken = function (username, password) {
        var secretKey = process.env.REFRESH_TOKEN_SECRET;
        var refreshToken = '';
        if (secretKey) {
            refreshToken = jsonwebtoken_1.default.sign({ username: username, password: password }, secretKey, { expiresIn: '25200s', algorithm: 'HS256' });
        }
        return refreshToken;
    };
    AuthMiddleWare.getUserbyToken = function (token) {
        var decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken && typeof decodedToken === 'object') {
            var user = Object.values(decodedToken)[0];
            return user;
        }
        return null;
    };
    return AuthMiddleWare;
}());
exports.default = AuthMiddleWare;
