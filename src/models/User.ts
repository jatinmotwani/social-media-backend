import {
  Table,
  Column,
  DataType,
  IsEmail,
  Model,
  HasMany,
} from "sequelize-typescript";
import { Like } from "./Like";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Table({
  tableName: "user",
})
export class User extends Model {
  @Column({ type: DataType.STRING })
  public fullName!: string;

  @IsEmail
  @Column({ type: DataType.STRING })
  public email!: string;

  @Column({ type: DataType.STRING })
  public password!: string;

  @HasMany(() => Post)
  public posts?: Post[];

  @HasMany(() => Comment)
  public comments?: Comment[];

  @HasMany(() => Like)
  public likes?: Like[];
}
