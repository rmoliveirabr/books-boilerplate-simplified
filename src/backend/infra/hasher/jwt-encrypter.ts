import { HashEncrypt } from "@/backend/domain/customer/hash/hash-encrypt";

import jwt from 'jsonwebtoken';

export class JwtEncrypter implements HashEncrypt {
  constructor(private readonly secret: string) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secret, { algorithm: 'RS256' },  (err, token) => {
        if (err) {
          console.log('Error while signing token:', err);
          reject(err);
          return;
        }
        console.log('Token:', token);
        resolve(token);
      });
    });
  }
}
