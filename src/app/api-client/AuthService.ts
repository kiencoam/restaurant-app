import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/auth";

export type IntrospectRequest = {
  token: string;
};
export type AuthenticationRequest = {
  email: string;
  password: string;
};
//khong co AuthEntity type
export const introspect = async (payload: IntrospectRequest) => {
  return await apiClientService
    .post(`${baseUrl}/introspect`, payload)
    .then((res) => res.data);
};

export const authenticate = async (payload: AuthenticationRequest) => {
  return await apiClientService
    .post(`${baseUrl}/authenticate`, payload)
    .then((res) => res.data);
};
