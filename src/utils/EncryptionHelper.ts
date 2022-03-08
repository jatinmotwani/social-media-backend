import bcrypt from "bcrypt";

export default class EncryptionHelper {
  static encryptPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, parseInt(process.env.SALT_ROUNDS));
  };

  static verfiyPassword = (plainPassword, encryptedPassword) => {
    // returns true if password matches
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  };
}
