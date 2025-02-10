import { User } from "../models/user";
import { Topic } from "./topic";

export interface Reply {
  id: number;
  userId: string;
  text: string;
  createdAt: Date;
  user?: User;
  topic?: Topic;
}
