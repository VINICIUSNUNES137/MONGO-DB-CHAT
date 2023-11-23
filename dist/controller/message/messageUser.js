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
exports.registerMessage = void 0;
const validateMessage_1 = require("./validate/validateMessage");
const sendMessage_1 = require("../../model/userDao/sendMessage");
const registerMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = (0, validateMessage_1.verifyRegisterChat)(data);
        if (typeof status === "string") {
            return {
                status: 422,
                message: status
            };
        }
        else {
            const statusSendMessage = yield (0, sendMessage_1.dbRegisterMessage)(data);
            if (statusSendMessage) {
                return {
                    status: 200,
                    message: "Register created successfully"
                };
            }
            else {
                return {
                    status: 422,
                    message: "Error Verification data. Try again"
                };
            }
        }
    }
    catch (error) {
        return {
            status: 500,
            message: "Error internal server"
        };
    }
});
exports.registerMessage = registerMessage;
