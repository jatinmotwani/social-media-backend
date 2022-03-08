import { IsString, IsEmail } from "class-validator";

export class Signup {
  @IsString()
  fullName: string;

  @IsEmail()
  email: number;

  @IsString()
  password: number;
}
