export interface CareGroup {
  group_id: number;
  group_name: string;
  date_created: Date;
}

export enum Role {
  PATIENT = 'PATIENT',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY'
}

export interface GroupRole {
  group_id: number;
  user_id: string;
  role: Role;
}
