import {
  IsString,
  IsNumber,
  IsDefined,
  IsEnum,
  IsOptional,
} from "class-validator";

export enum LikeType {
  POST = "POST",
  COMMENT = "COMMENT",
}

export class LikePost {
  @IsOptional()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  postId: number;

  @IsOptional()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  commentId: number;

  @IsDefined()
  @IsEnum(LikeType)
  likeType: LikeType;
}
