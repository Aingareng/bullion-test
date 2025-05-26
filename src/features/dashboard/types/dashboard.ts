export interface IUserData {
  _id: string;
  name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  photo: string;
  phone: string;
  address: string;
  status?: string;
}

export interface IQueryParams {
  offset?: string;
  limit?: string;
}

export type TypeUserUpdatePayload = {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  photo?: string;
  phone: string;
  address: string;
  status?: string;
  password?: string;
};
