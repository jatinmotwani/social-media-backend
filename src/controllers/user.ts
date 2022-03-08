import UserService from "../services/user";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Signup } from "../dto/user/signup.dto";
import { badRequest } from "../utils/response";
import { Login } from "../dto/user/login.dto";

export default class UserController {
  static async signup(req, res) {
    const errors = await validate(plainToClass(Signup, req.body));
    if (errors.length) {
      return badRequest(res, "Validation Error", {
        errors,
      });
    }
    return UserService.signupService(req, res);
  }
  static async login(req, res) {
    const errors = await validate(plainToClass(Login, req.body));
    if (errors.length) {
      return badRequest(res, "Validation Error", {
        errors,
      });
    }
    return UserService.loginService(req, res);
  }
}
