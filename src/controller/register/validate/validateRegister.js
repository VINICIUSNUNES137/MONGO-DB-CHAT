"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRegisterUser = void 0;
const verifyRegisterUser = (data) => {
    const urlRegex = /^(?:https?:\/\/)?[^\s\/]+(\.[^\s\/]+)*$/;
    switch (true) {
        case data.typeUser.toUpperCase() !== "CLIENT" && data.typeUser.toUpperCase() !== "DIARIST":
            return "Type user is invalid";
        case typeof data.name !== "string" || data.name === "" || data.name.length < 2:
            return "Invalid name";
        case !urlRegex.test(data.photoUrl):
            return "Invalid URL";
        case typeof data.userMysqlId !== "number":
            return "Invalid the id user, it must be a number";
        default:
            return true;
    }
};
exports.verifyRegisterUser = verifyRegisterUser;
