import Logout from "./Logout";
import Link from "next/link";

const NavBar = async () => {
  return (
    <div className="fixed left-0 top-0 flex flex-col min-h-screen w-[256px] p-2 justify-between items-center bg-navbg font-title font-[500] tracking-tight text-navtext">
      <div className="flex flex-col w-full items-center">
        <div className="flex items-center w-full h-[4rem] m-2 text-gray-100">
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

        <div className="rounded-md w-full h-[4rem] mx-2 hover:bg-[#454545]">
          <Link
            className="flex items-center w-full h-full"
            href="/home/dashboard"
          >
            <svg
              className="w-7 h-7 text-navtext ml-3 mr-4"
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
            <p className="text-[1.4rem]">Báo cáo</p>
          </Link>
        </div>

        <div className="rounded-md w-full h-[4rem] mx-2 hover:bg-[#454545]">
          <Link
            className="flex items-center w-full h-full"
            href="/home/kitchen"
          >
            <svg
              className="w-7 h-7 text-navtext ml-3 mr-4 icon icon-tabler icons-tabler-outline icon-tabler-chef-hat"
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
              <path d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4 4 0 1 1 2.092 -7.723a4 4 0 0 1 3.908 -3.151z" />
              <path d="M6.161 17.009l11.839 -.009" />
            </svg>
            <p className="text-[1.4rem]">Nhà bếp</p>
          </Link>
        </div>

        <div className="rounded-md w-full h-[4rem] mx-2 hover:bg-[#454545]">
          <Link
            className="flex items-center w-full h-full"
            href="/home/order-taking"
          >
            <svg
              className="w-7 h-7 text-navtext ml-3 mr-4"
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

            <p className="text-[1.4rem]">Gọi món</p>
          </Link>
        </div>

        <div className="rounded-md w-full h-[4rem] mx-2 hover:bg-[#454545]">
          <Link
            className="flex items-center w-full h-full"
            href="/home/table-booking"
          >
            <svg
              className="w-7 h-7 text-navtext ml-3 mr-4"
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

            <p className="text-[1.4rem]">Đặt bàn</p>
          </Link>
        </div>

        <div className="rounded-md w-full h-[4rem] mx-2 hover:bg-[#454545]">
          <Link
            className="flex items-center w-full h-full"
            href="/home/dashboard"
          >
            <svg
              className="w-6 h-6 text-navtext ml-4 mr-5 icon icon-tabler icons-tabler-outline icon-tabler-users"
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
            <p className="text-[1.4rem]">Quản lý</p>
          </Link>
        </div>
      </div>
      <div className="rounded-md w-full h-[4rem] mx-2 hover:bg-[#454545]">
        <Logout />
      </div>
    </div>
  );
};

export default NavBar;
