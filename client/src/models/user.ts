export type User = {
  id?:string,
  email:string,
  firstName:string,
  lastName:string,
  gender:string ,
  dateOfBirth:Date | string,
  roles:string[],
  password?:string;
}