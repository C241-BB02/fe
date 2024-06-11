import { SessionOptions } from "iron-session";

export enum UserRole {
  Admin = "ADMIN",
  Seller = "SELLER",
  Customer = "CUSTOMER",
}

export interface SessionData {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
  access?: string;
  refresh?: string;
  isLoggedIn: boolean;
}

export const defaultSession:SessionData = {
  isLoggedIn: false,
}

export const sessionOptions: SessionOptions ={
  password: process.env.SECRET_KEY!,
  cookieName: "bb-session",
  cookieOptions:{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production"
  }
}