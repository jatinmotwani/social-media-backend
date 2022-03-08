import * as jwt from "jsonwebtoken";

export default class JwtHelper {
  static sign = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
  };

  static verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
  };
}
