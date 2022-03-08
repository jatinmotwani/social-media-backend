import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { Like } from "./Like";
import { Post } from "./Post";
import { User } from "./User";

@Table({
  tableName: "comment",
})
export class Comment extends Model {
  @Column({ type: DataType.STRING })
  public content!: string;

  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  public userId!: number;

  @BelongsTo(() => Post)
  public post!: Post;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  public postId!: number;

  @HasMany(() => Like)
  public likes?: Like[];
}
