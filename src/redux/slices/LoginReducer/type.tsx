import { UserObject } from "../../redux/model/userTypes";

export type LoginUserState = Partial<UserObject>;

export interface SetIsLogin {
  isLogin: boolean;
}

export interface SetUserData {
  user: UserObject;
}

export interface SetLoginWith{
  loginWith:string;
}
