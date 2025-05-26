export class ApiClient {
  private baseUrl: string;

  constructor(endpoint: string) {
    this.baseUrl = endpoint;
  }

  private async request<ResponseType>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ResponseType> {
    const url = `${this.baseUrl}${endpoint}`;

    const isFormData =
      typeof FormData !== "undefined" && options.body instanceof FormData;

    const headers = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return errorData as ResponseType;
    }

    return await response.json();
  }

  public get = async <ResponseType>(
    endpoint: string,
    params?: Record<string, string>,
    options: RequestInit = {}
  ) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return await this.request<ResponseType>(`${endpoint}${queryString}`, {
      ...options,
      method: "GET",
    });
  };

  public post = async <ResponseType>(
    endpoint: string,
    data: unknown,
    options: RequestInit = {}
  ) => {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;

    return await this.request<ResponseType>(endpoint, {
      ...options,
      method: "POST",
      body: isFormData ? data : JSON.stringify(data),
    });
  };

  public put = async <ResponseType>(
    endpoint: string,
    data: unknown,
    params?: Record<string, string>,
    options: RequestInit = {}
  ) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";

    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;

    return await this.request<ResponseType>(`${endpoint}${queryString}`, {
      ...options,
      method: "PUT",
      body: isFormData ? data : JSON.stringify(data),
    });
  };

  public delete = async <ResponseType>(
    endpoint: string,
    params?: Record<string, string>,
    options: RequestInit = {}
  ) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";

    return await this.request<ResponseType>(`${endpoint}${queryString}`, {
      ...options,
      method: "DELETE",
    });
  };
}
