import "express";

export interface JwtUser {
  id: number;
  name: string;
  email: string;
}

declare module "express" {
  interface Request {
    user?: JwtUser;
  }
}
