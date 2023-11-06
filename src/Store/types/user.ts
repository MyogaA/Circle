export type IUser = {
    id?: number;
    full_name?: string;
    username?: string;
    email?: string;
    picture?: string;
    following?: Following[];
    followers?: [];
    bio?: string;

  }
  export type Following = {
    id: number;
    full_name?: string;
    username?: string;
    user: {
      id: number;
    };
  };
  export type follow = {
    id: number;
    user: {
      id: number;
    };
  };
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