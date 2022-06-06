export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isAdm?: boolean;
}

export interface IResponseUser {
  id?: string;
  name: string;
  email: string;
  isAdm: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}
