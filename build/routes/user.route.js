"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var userRouter = (0, express_1.Router)();
userRouter.post('/submitsheets', user_controller_1.default.submitsheets);
userRouter.get('/getPickings', user_controller_1.default.getPickings);
exports.default = userRouter;
