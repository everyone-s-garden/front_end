export interface IData {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface IData_Sever {
  appToken: string;
  isNewMember: boolean;
}
