import { RegisterUser } from "../interface/interfaceRegister";

const verifyRegisterUser = (data: RegisterUser) => {

  const urlRegex = /^(?:https?:\/\/)?[^\s\/]+(\.[^\s\/]+)*$/

  switch (true) {
    case data.typeUser.toUpperCase() !== "CLIENT" && data.typeUser !== "DIARIST":
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
}

export {
    verifyRegisterUser
}