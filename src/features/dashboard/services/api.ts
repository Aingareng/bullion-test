import { api } from "@/shared/utils/api";
import type {
  IQueryParams,
  IUserData,
  TypeUserUpdatePayload,
} from "../types/dashboard";
import type IApiResponse from "@/shared/types/apiResponse";
import localStorageUtils from "@/shared/utils/storage";
import type { ILoginData } from "@/features/auth/types/auth";

const user = localStorageUtils.get<ILoginData>("USER");

export const getUser = async (params?: IQueryParams) =>
  await api.get<IApiResponse<IUserData[]>>(
    "/admin",
    { ...params },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
export const updateUser = async (id: string, payload: TypeUserUpdatePayload) =>
  await api.put<IApiResponse<IUserData>>(
    `/admin/${id}/update`,
    payload,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
export const destroyUser = async (id: number) =>
  await api.delete<IApiResponse<null>>(`/admin/${id}/delete`);
