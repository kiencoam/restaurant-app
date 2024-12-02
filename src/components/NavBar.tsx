"use client";

import { usePathname } from "next/navigation";
import Logout from "./Logout";
import Link from "next/link";
import { hasPermission } from "@/auth";
import Image from "next/image";

const NavBar = ({ role }) => {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 flex flex-col min-h-screen w-[256px] p-2 justify-between items-center bg-[#262626] font-title font-[500] tracking-tight text-navtext">
      <div className="w-full h-[600px] overflow-auto">
        <div className="flex items-center w-full h-16 text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 ml-3 icon icon-tabler icons-tabler-outline icon-tabler-sparkles"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
          </svg>
          <p className="text-[1.875rem] font-[800] tracking-wide font-inter">
            TEAMIO
          </p>
        </div>

        {/* Thống kê */}
        {hasPermission(role, "/home/dashboard") && (
          <div
            className={`rounded-md w-full h-12 hover:bg-[#454545] ${
              pathname === "/home/dashboard"
                ? "bg-[#383838] text-[#dcf70f]"
                : ""
            }`}
          >
            <Link
              className="flex items-center gap-2 w-full h-full"
              href="/home/dashboard"
            >
              <svg
                className="w-5 h-5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
                />
              </svg>
              <p className="text-xl">Thống kê</p>
            </Link>
          </div>
        )}

        {/* Nhân viên */}
        {hasPermission(role, "/home/staff-management") && (
          <div className="group relative rounded-md w-full hover:bg-[#2b2b2b]">
            <div
              className={`w-full h-12 rounded-md flex items-center gap-2 cursor-pointer hover:bg-[#454545] ${
                pathname.startsWith("/home/staff")
                  ? "bg-[#383838] text-[#dcf70f]"
                  : ""
              }`}
            >
              <svg
                className="w-5 h-5 ml-3 icon icon-tabler icons-tabler-outline icon-tabler-users"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
              <p className="text-xl">Nhân viên</p>
            </div>
            <div className="hidden w-full p-2 group-hover:block font-[500] text-base">
              {/** Quản lý nhân viên */}
              <div
                className={`rounded-md w-full h-12 hover:bg-[#454545] ${
                  pathname === "/home/staff-management"
                    ? "bg-[#383838] text-[#dcf70f]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center gap-2 w-full h-full"
                  href="/home/staff-management"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-subtask w-5 h-5 ml-3"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 9l6 0" />
                    <path d="M4 5l4 0" />
                    <path d="M6 5v11a1 1 0 0 0 1 1h5" />
                    <path d="M12 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                    <path d="M12 15m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                  </svg>

                  <p className="text-xl">Quản lý</p>
                </Link>
              </div>

              {/** Lịch làm việc */}
              <div
                className={`rounded-md w-full h-12 hover:bg-[#454545] ${
                  pathname === "/home/staff-schedule"
                    ? "bg-[#383838] text-[#dcf70f]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center gap-2 w-full h-full"
                  href="/home/staff-schedule"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-plus w-5 h-5 ml-3"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                    <path d="M16 3v4" />
                    <path d="M8 3v4" />
                    <path d="M4 11h16" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                  </svg>

                  <p className="text-xl">Lịch làm việc</p>
                </Link>
              </div>

              {/** Chấm công */}
              <div
                className={`rounded-md w-full h-12 hover:bg-[#454545] ${
                  pathname === "/home/staff-attendance"
                    ? "bg-[#383838] text-[#dcf70f]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center gap-2 w-full h-full"
                  href="/home/staff-attendance"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-check w-5 h-5 ml-3"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />
                    <path d="M16 3v4" />
                    <path d="M8 3v4" />
                    <path d="M4 11h16" />
                    <path d="M15 19l2 2l4 -4" />
                  </svg>

                  <p className="text-xl">Chấm công</p>
                </Link>
              </div>

              {/** Bảng tính lương */}
              <div
                className={`rounded-md w-full h-12 hover:bg-[#454545] ${
                  pathname === "/home/staff-payroll"
                    ? "bg-[#383838] text-[#dcf70f]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center gap-2 w-full h-full"
                  href="/home/staff-payroll"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-coins w-5 h-5 ml-3"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" />
                    <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" />
                    <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" />
                    <path d="M3 6v10c0 .888 .772 1.45 2 2" />
                    <path d="M3 11c0 .888 .772 1.45 2 2" />
                  </svg>

                  <p className="text-xl">Bảng tính lương</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Hàng hóa */}
        {hasPermission(role, "/home/products") && (
          <div
            className={`rounded-md w-full h-12 hover:bg-[#454545] ${
              pathname === "/home/products" ? "bg-[#383838] text-[#dcf70f]" : ""
            }`}
          >
            <Link
              className="flex items-center gap-2 w-full h-full"
              href="/home/products"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-box w-5 h-5 ml-3"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                <path d="M12 12l8 -4.5" />
                <path d="M12 12l0 9" />
                <path d="M12 12l-8 -4.5" />
              </svg>
              <p className="text-xl">Hàng hóa</p>
            </Link>
          </div>
        )}

        {/* Nhập hàng */}
        {hasPermission(role, "/home/purchase-order") && (
          <div
            className={`rounded-md w-full h-12 hover:bg-[#454545] ${
              pathname.startsWith("/home/purchase-order")
                ? "bg-[#383838] text-[#dcf70f]"
                : ""
            }`}
          >
            <Link
              className="flex items-center gap-2 w-full h-full"
              href="/home/purchase-order"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-exchange-2 w-5 h-5 ml-3"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 10h-14l4 -4" />
                <path d="M7 14h14l-4 4" />
              </svg>
              <p className="text-xl">Nhập hàng</p>
            </Link>
          </div>
        )}

        {/* Khách hàng */}
        {hasPermission(role, "/home/customer-management") && (
          <div
            className={`rounded-md w-full h-12 hover:bg-[#454545] ${
              pathname.startsWith("/home/customer-management")
                ? "bg-[#383838] text-[#dcf70f]"
                : ""
            }`}
          >
            <Link
              className="flex items-center gap-2 w-full h-full"
              href="/home/customer-management"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-friends w-5 h-5 ml-3"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
              </svg>
              <p className="text-xl">Khách hàng</p>
            </Link>
          </div>
        )}

        {/* Nhà bếp */}
        {hasPermission(role, "/home/kitchen") && (
          <div
            className={`rounded-md w-full h-12 hover:bg-[#454545] ${
              pathname === "/home/kitchen" ? "bg-[#383838] text-[#dcf70f]" : ""
            }`}
          >
            <Link
              className="flex items-center gap-2 w-full h-full"
              href="/home/kitchen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-tools-kitchen w-5 h-5 ml-3"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 3h8l-1 9h-6z" />
                <path d="M7 18h2v3h-2z" />
                <path d="M20 3v12h-5c-.023 -3.681 .184 -7.406 5 -12z" />
                <path d="M20 15v6h-1v-3" />
                <path d="M8 12l0 6" />
              </svg>
              <p className="text-xl">Nhà bếp</p>
            </Link>
          </div>
        )}

        {/* Gọi món */}
        {hasPermission(role, "/home/order-taking") && (
          <div
            className={`rounded-md w-full h-12 hover:bg-[#454545] ${
              pathname === "/home/order-taking"
                ? "bg-[#383838] text-[#dcf70f]"
                : ""
            }`}
          >
            <Link
              className="flex items-center gap-2 w-full h-full"
              href="/home/order-taking"
            >
              <svg
                className="w-5 h-5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                />
              </svg>

              <p className="text-xl">Gọi món</p>
            </Link>
          </div>
        )}

        {/* Đặt bàn */}
        {hasPermission(role, "/home/order-booking") && (
          <div
            className={`rounded-md w-full h-12 hover:bg-[#454545] ${
              pathname === "/home/order-booking"
                ? "bg-[#383838] text-[#dcf70f]"
                : ""
            }`}
          >
            <Link
              className="flex items-center gap-2 w-full h-full"
              href="/home/order-booking"
            >
              <svg
                className="w-5 h-5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 18h14M5 18v3h14v-3M5 18l1-9h12l1 9M16 6v3m-4-3v3m-2-6h8v3h-8V3Zm-1 9h.01v.01H9V12Zm3 0h.01v.01H12V12Zm3 0h.01v.01H15V12Zm-6 3h.01v.01H9V15Zm3 0h.01v.01H12V15Zm3 0h.01v.01H15V15Z"
                />
              </svg>

              <p className="text-xl">Đặt bàn</p>
            </Link>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="rounded-md w-full h-12 hover:bg-[#454545]">
          <Logout />
        </div>
        <button className="flex items-center w-full h-16 rounded-md hover:bg-[#454545]">
          <Image
            src="/avatar/default.jpg"
            width={500}
            height={500}
            alt="Picture of the user"
            className="rounded-full h-10 w-10 ml-2"
          />
          <div className="ml-3 flex flex-col justify-center items-start">
            <div className="text-white">Alexander Kien Pham</div>
            <div className="text-[#8c8c8c] text-sm">{role}</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
