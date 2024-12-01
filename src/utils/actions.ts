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
    "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJxdWFudHVhbmh1eSIsInN1YiI6IjEiLCJleHAiOjE3MzM0MTMzOTYsImlhdCI6MTczMzA1MzM5NiwianRpIjoiZGVlZWNhMDktNWE5Mi00NGQzLWFhMjQtYTgzMWYwOWE0YjNlIiwic2NvcGUiOiJBRE1JTiJ9.OspkfVYNAQSFKyQbjIuEh1roHY4OPRqW83CP3PHV8FHXaXehn803F4jnuMs6R1GIyCGluzAJse0NeY5Tj1hl9A"
  );

  return true;
};

export const doLogout = () => {
  deleteToken();
  redirect("/");
};
