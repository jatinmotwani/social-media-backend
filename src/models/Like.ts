import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Post } from "./Post";
import { User } from "./User";
import { Comment } from "./Comment";

@Table({
  tableName: "like",
})
export class Like extends Model {
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

  @BelongsTo(() => Comment)
  public comment!: Comment;

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER })
  public commentId!: number;
}
