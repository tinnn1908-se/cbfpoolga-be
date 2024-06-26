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
var db_1 = require("../db");
var helper_1 = __importDefault(require("../helper"));
var UserQuery = /** @class */ (function () {
    function UserQuery() {
    }
    UserQuery.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        console.log('hashed password : ' + user.password);
                        sql = "insert into users \n            values('".concat(user.id, "','").concat(user.username, "','").concat(user.password, "',\n            '").concat(user.email, "','").concat(user.created_date, "',").concat(user.is_activated, ",").concat(user.is_deleted, ")");
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = (_a.sent())[0];
                        if (Number(result.affectedRows > 0)) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                    case 4:
                        error_1 = _a.sent();
                        console.log('error : ' + error_1);
                        return [2 /*return*/, false];
                    case 5:
                        connection.end();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.isExistedUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = "select * from users u where u.username = '".concat(username, "'");
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = (_a.sent())[0];
                        if (result.length > 0)
                            return [2 /*return*/, true];
                        return [2 /*return*/, false];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, false];
                    case 5:
                        connection.end();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.isExistedEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = "select * from users u where u.email = '".concat(email, "'");
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = (_a.sent())[0];
                        if (result.length > 0)
                            return [2 /*return*/, true];
                        return [2 /*return*/, false];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, false];
                    case 5:
                        connection.end();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.activateUser = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        sql = "update users set is_activated = true where id = '".concat(userID, "'");
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = (_a.sent())[0];
                        if (Number(result.affectedRows) > 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.getUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        sql = "select * from users u where u.username = '".concat(username, "' and u.is_activated = true");
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = (_a.sent())[0];
                        console.log('getUserByUsername : ' + Object.values(result[0]));
                        return [2 /*return*/, result[0]];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log('getUserByEmail : ' + email);
                        return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM users u where u.email = 'tinnn1908.se@gmail.com' and u.is_activated = true";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = (_a.sent())[0];
                        console.log('getUserByEmail : ' + Object.values(result[0]));
                        return [2 /*return*/, result[0]];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.createPickingDetail = function (pickingDetails, pickingID) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = "insert into pickingdetails values('".concat(pickingDetails.pickingDetailId, "',\n            '").concat(pickingDetails.awayteam, "',").concat(pickingDetails.awayscore, ",").concat(pickingDetails.awaynumber, ",\n            '").concat(pickingDetails.hometeam, "',").concat(pickingDetails.homescore, ",").concat(pickingDetails.homenumber, ",\n            '").concat(pickingDetails.selected_team, "',").concat(pickingDetails.isLastgame, ",'").concat(pickingID, "');");
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = (_a.sent())[0];
                        if (Number(result.affectedRows > 0)) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                    case 4:
                        error_7 = _a.sent();
                        console.log('error : ' + error_7);
                        return [2 /*return*/, false];
                    case 5:
                        connection.end();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.createPicking = function (picking, lastCounter) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = "insert into pickings values ('".concat(picking.id, "','").concat(picking.entry, "','").concat(picking.username, "',").concat(picking.tiebreak, ",'").concat(helper_1.default.getCurrentDateTime(), "',").concat(lastCounter + 1, ")");
                        console.log('sql : ' + sql);
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = (_a.sent())[0];
                        if (Number(result.affectedRows > 0)) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                    case 4:
                        error_8 = _a.sent();
                        console.log('error : ' + error_8);
                        return [2 /*return*/, false];
                    case 5:
                        connection.end();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.getLastCounter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'select * from pickings order by counter';
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = (_a.sent())[0];
                        if (typeof result[0] === 'undefined') {
                            return [2 /*return*/, 0];
                        }
                        else {
                            console.log('lastCounter : ' + Number(result[0].counter));
                            return [2 /*return*/, Number(result[0].counter)];
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_9 = _a.sent();
                        console.log('error : ' + error_9);
                        return [2 /*return*/, false];
                    case 5:
                        connection.end();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.getAllPickingsInWeek = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = "select * from pickings";
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result];
                    case 4:
                        error_10 = _a.sent();
                        console.log('error : ' + error_10);
                        return [2 /*return*/, null];
                    case 5:
                        connection.end();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserQuery.getPickingDetailsByPickingID = function (pickingID) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.getConnection)()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = "select * from pickingdetails where picking_id = '".concat(pickingID, "';");
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result];
                    case 4:
                        error_11 = _a.sent();
                        console.log('error : ' + error_11);
                        return [2 /*return*/, null];
                    case 5:
                        connection.end();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserQuery;
}());
exports.default = UserQuery;
