"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = __importDefault(require("../helper"));
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var user_queries_1 = __importDefault(require("../queries/user.queries"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.register = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, email, id, created_date, salt, hashPassword, user, isCreated, isExistedUsername, isExistedEmail, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        password = request.body.password;
                        email = request.body.email;
                        id = helper_1.default.generateID();
                        created_date = helper_1.default.getCurrentDateTime();
                        return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
                    case 2:
                        hashPassword = _a.sent();
                        user = { id: id, username: username, password: hashPassword, email: email, created_date: created_date, is_activated: false, is_deleted: false };
                        console.log("user : " + Object.values(user));
                        isCreated = false;
                        return [4 /*yield*/, user_queries_1.default.isExistedUsername(username)];
                    case 3:
                        isExistedUsername = _a.sent();
                        return [4 /*yield*/, user_queries_1.default.isExistedEmail(email)];
                    case 4:
                        isExistedEmail = _a.sent();
                        token = auth_middleware_1.default.generateToken(user);
                        if (!(!isExistedEmail && !isExistedUsername && token.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, user_queries_1.default.createUser(user)];
                    case 5:
                        isCreated = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (isCreated)
                            return [2 /*return*/, response.status(200).json({
                                    "access_token": "".concat(token)
                                })];
                        return [2 /*return*/, response.status(304).json('Create User Failed !')];
                }
            });
        });
    };
    AuthController.verifyEmail = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var token, isActivated, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = request.params.token;
                        isActivated = false;
                        if (!token) return [3 /*break*/, 3];
                        return [4 /*yield*/, auth_middleware_1.default.getUserbyToken(token)];
                    case 1:
                        user = _a.sent();
                        console.log("user by token : " + user);
                        if (!(user !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, user_queries_1.default.activateUser(user.id)];
                    case 2:
                        isActivated = _a.sent();
                        console.log("isActivated : " + isActivated);
                        if (isActivated)
                            return [2 /*return*/, response.status(200).json("token : ".concat(token))];
                        _a.label = 3;
                    case 3: return [2 /*return*/, response.status(404).json('Failed Verified')];
                }
            });
        });
    };
    AuthController.authenticate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, email, password, tokens, user, isCorrectPassword, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('authenticate');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        username = request.body.username;
                        email = request.body.email;
                        password = request.body.password;
                        tokens = {
                            access_token: '', refresh_token: ''
                        };
                        user = null;
                        console.log('username : ' + username);
                        console.log('email : ' + email);
                        console.log('password : ' + password);
                        if (!(username.length > 0)) return [3 /*break*/, 3];
                        console.log('username.length > 0');
                        return [4 /*yield*/, user_queries_1.default.getUserByUsername(username)];
                    case 2:
                        user = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(email.length > 0)) return [3 /*break*/, 5];
                        console.log('email.length > 0');
                        return [4 /*yield*/, user_queries_1.default.getUserByEmail(email)];
                    case 4:
                        user = _a.sent();
                        _a.label = 5;
                    case 5:
                        console.log("authenticate : " + user);
                        if (!user) return [3 /*break*/, 7];
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 6:
                        isCorrectPassword = _a.sent();
                        console.log("password : " + password);
                        console.log("user password : " + user.password);
                        console.log("isCorrectPassword : " + isCorrectPassword);
                        if (isCorrectPassword) {
                            tokens.access_token = auth_middleware_1.default.generateToken(user);
                            tokens.refresh_token = auth_middleware_1.default.generateRefreshToken(user.username, user.password);
                        }
                        _a.label = 7;
                    case 7:
                        if (tokens.access_token.length > 0 && tokens.refresh_token.length > 0)
                            return [2 /*return*/, response.status(200).json({ tokens: tokens })];
                        return [2 /*return*/, response.status(404).json({
                                status: 404,
                                msgErr: "User not found !"
                            })];
                    case 8:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.status(404).json({
                                status: 404,
                                msgErr: "User not found !"
                            })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.authorize = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, user;
            return __generator(this, function (_a) {
                console.log('authorize');
                try {
                    tokens = {
                        access_token: request.body.access_token,
                        refresh_token: request.body.refresh_token
                    };
                    console.log("authorize : " + tokens.access_token);
                    if (tokens && tokens.access_token.length > 0) {
                        user = auth_middleware_1.default.getUserbyToken(tokens.access_token);
                        console.log("user : " + typeof user + " - " + user);
                        if (user) {
                            return [2 /*return*/, response.status(200).json({ user: user })];
                        }
                        return [2 /*return*/, response.status(404).json({
                                msgErr: "Authorize Failed !"
                            })];
                    }
                    return [2 /*return*/, response.status(404).json({
                            msgErr: "Authorize Failed !"
                        })];
                }
                catch (error) {
                    return [2 /*return*/, response.status(404).json({
                            msgErr: "Authorize Failed !"
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    return AuthController;
}());
exports.default = AuthController;
