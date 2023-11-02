export type IUser = {
    id?: number;
    full_name?: string;
    username?: string;
    email?: string;
    picture?: string;
    following?: [] | undefined;
    followers?: [] | undefined;
  }
  
  export type IUserRegister = {
    full_name: string;
    username: string;
    email: string;
    password: string;
  }
  
  export type IUserlogin = {
    id?: number;
    full_name?: string;
    username?: string;
    email: string;
    password: string;
  }