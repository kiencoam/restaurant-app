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
    //const response = await authenticate(payload);
    const response = await fetch(
      "http://localhost:8080/api/v1/auth/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      return false;
    }
    const responseJson = await response.json();

    setToken(responseJson.data.token);
  } catch (err) {
    return false;
  }

  return true;
};

export const doLogout = () => {
  deleteToken();
  redirect("/");
};
