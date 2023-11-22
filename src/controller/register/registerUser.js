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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const validateRegister_1 = require("./validate/validateRegister");
const registerClient_1 = require("../../model/userDao/registerClient");
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const status = (0, validateRegister_1.verifyRegisterUser)(data);
    if (typeof status === "string") {
        return {
            status: 422,
            message: status
        };
    }
    else {
        const statusRegister = yield (0, registerClient_1.dbRegisterUser)(data);
        if (statusRegister) {
            return {
                status: 201,
                message: "Register created successfully"
            };
        }
        else {
            return {
                status: 400,
                message: "Error creating registration. Obs: It is not allowed to register the same user with the same userMysqlId"
            };
        }
    }
});
exports.registerUser = registerUser;
