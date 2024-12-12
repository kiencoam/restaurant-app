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
    "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJxdWFudHVhbmh1eSIsInN1YiI6IjEiLCJleHAiOjE3MzQyOTI3MzQsImlhdCI6MTczMzkzMjczNCwianRpIjoiOGNkMGUyZmYtNTQ1NS00ZTM3LTgyNzQtZjQ1YTFiMTIwZjM5Iiwic2NvcGUiOiJBRE1JTiJ9.4sV3Nc7VjbJvmxg3rRe8XzhLMqPhg3zoQMcHOh_cc9DKekv0vEtR37inF1k75z_JkSsYsF7UoZWHk55Xk9WPWg"
  );

  return true;
};

export const doLogout = () => {
  deleteToken();
  redirect("/");
};
