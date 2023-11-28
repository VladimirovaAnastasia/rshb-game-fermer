export interface User {
  id: string;
  username: string;
  ballance?: number;
  signup_date?: string;
}

export interface UserSchema {
  authData?: User;
}
