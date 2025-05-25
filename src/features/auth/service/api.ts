import type IApiResponse from "../../../shared/types/apiResponse";
import { api } from "../../../shared/utils/api";

const BASE_URL = "/auth";

export const postLogin = async (payload: ILoginPayload) =>
  api.post<IApiResponse<ILoginData>>(`${BASE_URL}/login`, payload);

export const postRegister = async (payload: IRegisterPayload) =>
  api.post<IApiResponse<ILoginData>>(`${BASE_URL}/register`, payload);
