interface ILoginPayload {
  email: string;
  password: string;
}
interface ILoginData {
  name: string;
  email: string;
  token: string;
}

type GenderType = "male" | "female" | "other";
interface IRegisterPayload {
  first_name: sting;
  last_name: string;
  gender: GenderType;
  date_of_birth: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  photo: File;
}
