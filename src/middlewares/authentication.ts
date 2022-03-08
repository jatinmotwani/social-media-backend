import { unauthorized } from "../utils/response";
import JwtHelper from "../utils/JwtHelper";
import UserRepository from "../repository/user";

export default async function authenticate(req, res, next) {
  try {
    const authorization =
      req.headers.authorization || req.headers.Authorization;
    if (!authorization || !authorization.split(" ")[1]) {
      return unauthorized(res);
    }
    const authToken = authorization.split(" ")[1];
    const verifiedData = JwtHelper.verify(authToken);
    if (!verifiedData) {
      return unauthorized(res);
    }
    const user = await UserRepository.findOneByQuery({
      id: verifiedData.id,
    });
    if (!user) {
      return unauthorized(res);
    }
    req.user = user;
    next();
  } catch (error) {
    return unauthorized(res);
  }
}
