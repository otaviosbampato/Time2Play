declare module 'jsonwebtoken' {
    export interface JwtPayload {
      id: number;
      tipoConta: string;
      isAdm: boolean;
    }
  
    export function sign(payload: JwtPayload, secretOrPrivateKey: string, options?: jwt.SignOptions): string;
  }