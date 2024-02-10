export interface User {
  userID: string;
  userEmail: string;
}

export interface Group {
  groupID: string;
  role: string; // TODO: update to enum
}
