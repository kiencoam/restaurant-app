"use server";

import { signIn, signOut } from "@/auth";

export const doLogin = async (formData) => {
  console.log(formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const doLogout = async () => {
  await signOut({ redirectTo: "/" });
};
