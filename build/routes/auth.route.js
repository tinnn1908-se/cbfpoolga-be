"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
var authRouter = (0, express_1.Router)();
authRouter.post('/signup', auth_controller_1.default.register);
authRouter.post('/confirm/:token', auth_controller_1.default.verifyEmail);
authRouter.post("/authentication", auth_controller_1.default.authenticate);
authRouter.post("/authorization", auth_controller_1.default.authorize);
exports.default = authRouter;
