import { Role } from '../types/group';

export interface User {
  userID: string;
  userEmail: string;
}

export interface Group {
  groupID: number;
  role: Role;
}
