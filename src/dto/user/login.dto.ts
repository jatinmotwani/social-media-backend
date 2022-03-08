import { IsString, IsEmail } from "class-validator";

export class Login {
  @IsEmail()
  email: number;

  @IsString()
  password: number;
}
