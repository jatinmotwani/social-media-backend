import { IsString, IsNumber } from "class-validator";

export class Comment {
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  postId: number;

  @IsString()
  content: string;
}
