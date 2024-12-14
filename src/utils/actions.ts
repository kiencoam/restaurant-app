"use server";

import { setToken, deleteToken } from "./cookiesHandler";
import { redirect } from "next/navigation";
import {
  authenticate,
  AuthenticationRequest,
} from "@/app/api-client/AuthService";

export const doLogin = async (formData: FormData) => {
  console.log(formData);

  try {
    const payload: AuthenticationRequest = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const response = await authenticate(payload);
    setToken(response.token);
  } catch (err) {
    return false;
  }

  return true;
};

export const doLogout = () => {
  deleteToken();
  redirect("/");
};
