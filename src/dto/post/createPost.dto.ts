import { IsString, IsNumber } from "class-validator";

export class CreatePost {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
