import type { User } from "./user";

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  date: string;
  user: User;
}
