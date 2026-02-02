import { Request } from 'express';

export interface RequestWithAuth extends Request {
  cookies: {
    access_token: string;
  };
}
