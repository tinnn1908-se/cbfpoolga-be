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
var user_queries_1 = __importDefault(require("../queries/user.queries"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.submitsheets = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var pickings, lastCounter, counterPickingdetailsCreated, counterPickingCreated, pickingdetailsCreatedFlag, pickingCreatedFlag, i, isPickingCreated, j, pickingDetail, isPickingdetailsCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pickings = request.body.pickings;
                        return [4 /*yield*/, user_queries_1.default.getLastCounter()];
                    case 1:
                        lastCounter = _a.sent();
                        console.log('pickings : ' + pickings);
                        counterPickingdetailsCreated = 0;
                        counterPickingCreated = 0;
                        pickingdetailsCreatedFlag = false;
                        pickingCreatedFlag = false;
                        if (lastCounter === false)
                            lastCounter = 0;
                        console.log('lastCounter : ' + lastCounter);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < pickings.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, user_queries_1.default.createPicking(pickings[i], lastCounter)];
                    case 3:
                        isPickingCreated = _a.sent();
                        console.log('isPickingCreated : ' + isPickingCreated);
                        if (!isPickingCreated) return [3 /*break*/, 8];
                        counterPickingCreated++;
                        j = 0;
                        _a.label = 4;
                    case 4:
                        if (!(j < pickings[i].pickingdetails.length)) return [3 /*break*/, 7];
                        pickingDetail = pickings[i].pickingdetails[j];
                        return [4 /*yield*/, user_queries_1.default.createPickingDetail(pickingDetail, pickings[i].id)];
                    case 5:
                        isPickingdetailsCreated = _a.sent();
                        if (isPickingdetailsCreated) {
                            console.log('isPickingCreated : ' + isPickingCreated);
                            counterPickingdetailsCreated++;
                        }
                        ;
                        _a.label = 6;
                    case 6:
                        j++;
                        return [3 /*break*/, 4];
                    case 7:
                        console.log("counterPickingdetailsCreated : " + counterPickingdetailsCreated);
                        console.log("list sie : " + pickings[i].pickingdetails.length);
                        if (counterPickingdetailsCreated === pickings[i].pickingdetails.length) {
                            console.log('pickingdetailsCreatedFlag : true');
                            pickingdetailsCreatedFlag = true;
                        }
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9:
                        if (counterPickingCreated === pickings.length) {
                            console.log('counterPickingCreated : true');
                            pickingCreatedFlag = true;
                        }
                        if (pickingCreatedFlag && pickingdetailsCreatedFlag) {
                            return [2 /*return*/, response.status(200).json('Create Pickings Successfully !')];
                        }
                        return [2 /*return*/, response.status(304).json('Create Pickings failed !')];
                }
            });
        });
    };
    UserController.getPickings = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var pickings, i, pickingDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pickings = [];
                        return [4 /*yield*/, user_queries_1.default.getAllPickingsInWeek()];
                    case 1:
                        pickings = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < pickings.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, user_queries_1.default.getPickingDetailsByPickingID(pickings[i].id)];
                    case 3:
                        pickingDetails = _a.sent();
                        pickings[i].pickingdetails = pickingDetails;
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (pickings.length > 0) {
                            return [2 /*return*/, response.status(200).json({ pickings: pickings })];
                        }
                        return [2 /*return*/, response.status(404).json('Can not find data')];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
