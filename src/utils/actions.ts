"use server";

import { setToken, deleteToken } from "./cookiesHandler";
import { redirect } from "next/navigation";

export const doLogin = (formData: FormData) => {
  console.log(formData);

  // try {
  //   const response = await signIn("credentials", {
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //     redirect: false,
  //   });
  //   return response;
  // } catch (err) {
  //   throw err;
  // }

  setToken(
    "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJxdWFudHVhbmh1eSIsInN1YiI6IjEiLCJleHAiOjE3MzEyNzA3NDUsImlhdCI6MTczMDkxMDc0NSwianRpIjoiODhjNGEwMzUtZjFmNi00NDljLTlkODQtOTBjZDMyOWQzNjE4Iiwic2NvcGUiOiJURVNURVIifQ.uHgnLDj6WiLWHMK8mSMnISRX2WTrmr0Vc2puwZLZ-nd_YpwpmcnjpqfoDG0gSWVSwuRM5OJz1kL1uWZr9CKYsg"
  );

  return true;
};

export const doLogout = () => {
  deleteToken();
  redirect("/");
};
