export interface IData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
}

export interface IData_Sever {
  appToken: string;
  isNewMember: boolean;
}
