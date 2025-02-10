import { User } from "../models/user";

export interface Topic {
    id:number,
    userId:string,
    title:string,
    createdAt:Date,
    user?:User;
}