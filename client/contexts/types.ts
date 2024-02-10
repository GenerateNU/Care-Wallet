export interface User {
  userID: string;
  userEmail: string;
}

export interface Group {
  groupID: number;
  role: string; // TODO: update to enum
}
