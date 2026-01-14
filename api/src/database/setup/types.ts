import type {
  Generated,
  ColumnType,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UsersTable;
  posts: PostsTable;
  comments: CommentsTable;
}

export interface UsersTable {
  id: Generated<number>;
  name: string;
  email: string;
  password: string;
}

export interface PostsTable {
  id: Generated<number>;
  title: string;
  content: string;
  user_id: number;
  date: ColumnType<Date, string | undefined, never>;
  is_posted: boolean;
}

export interface CommentsTable {
  id: Generated<number>;
  post_id: number;
  user_id: number;
  content: string;
  date: ColumnType<Date, string | undefined, never>;
}

// Optional: Helper types for inserts/updates
export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export type Post = Selectable<PostsTable>;
export type NewPost = Insertable<PostsTable>;
export type PostUpdate = Updateable<PostsTable>;

export type Comment = Selectable<CommentsTable>;
export type NewComment = Insertable<CommentsTable>;
export type CommentUpdate = Updateable<CommentsTable>;
