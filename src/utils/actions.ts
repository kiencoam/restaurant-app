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
    "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJxdWFudHVhbmh1eSIsInN1YiI6IjEiLCJleHAiOjE3MzM0MTMzOTYsImlhdCI6MTczMzA1MzM5NiwianRpIjoiZGVlZWNhMDktNWE5Mi00NGQzLWFhMjQtYTgzMWYwOWE0YjNlIiwic2NvcGUiOiJURVNURVIifQ.gkIFMv3tMs6-CpYOJOmsyo6k9EH8CTZvg-8Pbn9e8M1eWgRcPdTXU9xRxIjB5qRuTp5A5sFwYE1AUtqNtvPB2Q"
  );

  return true;
};

export const doLogout = () => {
  deleteToken();
  redirect("/");
};
