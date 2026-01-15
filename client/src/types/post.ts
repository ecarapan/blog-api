import type { User } from "./user";
import type { Comment } from "./comment";

export interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  user: User;
  comments: Comment[];
}
