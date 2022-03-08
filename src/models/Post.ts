import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { Comment } from "./Comment";
import { Like } from "./Like";

@Table({
  tableName: "post",
})
export class Post extends Model {
  @Column({ type: DataType.STRING })
  public title!: string;

  @Column({ type: DataType.STRING })
  public content!: string;

  @Column({ type: DataType.INTEGER })
  public like_count!: number;

  @Column({ type: DataType.INTEGER })
  public comment_count!: number;

  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  public userId!: number;

  @HasMany(() => Comment)
  public comments?: Comment[];

  @HasMany(() => Like)
  public likes?: Like[];
}
