export interface User {
  id: number;
  name: string;
  email: string;
}

export interface TokenResponse {
  token: string,
}

export interface UserAndToken {
  user: User,
  token: string
}
