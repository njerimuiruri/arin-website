// src/types/express/index.d.ts
import { UserType } from '../../user/user.type'; // Adjust path as needed

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserType;
  }
}
