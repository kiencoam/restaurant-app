"use client";

import { doLogin } from "@/utils/actions";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await doLogin(formData);

    if (response) router.push("/home");
  }

  return (
    <div className="bg-loginbg flex justify-end min-h-screen">
      <div className="bg-white flex flex-col items-center justify-center min-h-full w-[40rem] m-2.5 rounded-xl shadow-xl">
        <svg
          className="h-14 w-14 mb-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M0 32C0 14.3 14.3 0 32 0L480 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-176 0 0-48c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 48L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32L32 64C14.3 64 0 49.7 0 32zm96 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8l144 0z" />
        </svg>
        <div className="mb-20 text-center">
          <h1 className="text-[2.8rem] font-bold font-inter tracking-wide">
            Welcome back!
          </h1>
          <p className="font-flux text-lg">
            Hãy điền thông tin đăng nhập của bạn
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-center w-full "
          onSubmit={handleSubmit}
        >
          <div className="relative w-2/3 h-[50px] border-b-2 border-b-black my-[30px]">
            <input
              className="peer w-full h-full pr-[40px] font-flux font-semibold text-2xl bg-transparent border-none outline-none"
              type="text"
              name="username"
              id="username"
              required
            />
            <label
              className="font-flux text-2xl transition-all duration-500 absolute top-1/2 left-[5px] -translate-y-1/2 pointer-events-none peer-focus:-top-2 peer-focus:scale-75 peer-valid:-top-2 peer-valid:scale-75"
              htmlFor="username"
            >
              Username
            </label>
            <svg
              className="w-7 h-7 absolute top-1/4 right-[8px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
            </svg>
          </div>
          <div className="relative w-2/3 h-[50px] border-b-2 border-b-black my-[10px]">
            <input
              className="peer w-full h-full pr-[40px] font-flux font-semibold text-2xl bg-transparent border-none outline-none"
              type="password"
              name="password"
              id="password"
              required
            />
            <label
              className="font-flux text-2xl transition-all duration-500 absolute top-1/2 left-[5px] -translate-y-1/2 pointer-events-none peer-focus:-top-2 peer-focus:scale-75 peer-valid:-top-2 peer-valid:scale-75"
              htmlFor="password"
            >
              Password
            </label>
            <svg
              className="w-7 h-7 absolute top-1/4 right-[8px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 14H12.6586C11.8349 16.3304 9.61244 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.61244 6 11.8349 7.66962 12.6586 10H23V14H21V18H17V14ZM7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z"></path>
            </svg>
          </div>

          <button
            className="w-2/3 h-[50px] rounded-full bg-black my-[35px] text-white font-flux text-2xl"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
