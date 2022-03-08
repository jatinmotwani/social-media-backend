import EncryptionHelper from "../utils/EncryptionHelper";
import JwtHelper from "../utils/JwtHelper";
import {
  internalServerError,
  successResponse,
  badRequest,
} from "../utils/response";
import { Messages } from "../utils/message";
import UserRepository from "../repository/user";

export default class UserService {
  static signupService = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      const existingUser = await UserRepository.findOneByQuery({
        email,
      });
      if (existingUser) {
        return badRequest(res, Messages.USER_MESSAGES.USER_ALREADY_EXISTS);
      }
      const encryptedPassword = EncryptionHelper.encryptPassword(password);
      const user = await UserRepository.createUser({
        fullName,
        email,
        password: encryptedPassword,
      });
      return successResponse(res, Messages.USER_MESSAGES.SIGN_UP_SUCCESS, {
        fullName,
        email,
        id: user.id,
      });
    } catch (error) {
      return internalServerError(res, Messages.USER_MESSAGES.SIGN_UP_ERROR);
    }
  };

  static loginService = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.findOneByQuery({
        email,
      });
      if (!user) {
        return badRequest(res, Messages.USER_MESSAGES.INVALID_USERNAME);
      }
      if (!EncryptionHelper.verfiyPassword(password, user.password)) {
        return badRequest(res, Messages.USER_MESSAGES.INVALID_PASSWORD);
      }
      const jwtToken = JwtHelper.sign({
        id: user.id,
        email: user.email,
      });
      return successResponse(res, Messages.USER_MESSAGES.LOGIN_IN_SUCCESS, {
        token: jwtToken,
      });
    } catch (error) {
      return internalServerError(res, Messages.USER_MESSAGES.LOGIN_IN_ERROR);
    }
  };
}
