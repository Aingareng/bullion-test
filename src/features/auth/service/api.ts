import type IApiResponse from "../../../shared/types/apiResponse";
import { api } from "../../../shared/utils/api";
import type { ILoginData, ILoginPayload } from "../types/auth";

const BASE_URL = "/auth";

export const postLogin = async (payload: ILoginPayload) =>
  await api.post<IApiResponse<ILoginData>>(`${BASE_URL}/login`, payload);

export const postRegister = async (payload: FormData) =>
  await api.post<IApiResponse<ILoginData>>(`${BASE_URL}/register`, payload);
