import { signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/todo-image.png";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ isSession }: any) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a className="flex flex-row" href="/">
            <Image className="h-14 w-auto" src={Logo} alt="2DO Logo" />
            <span className="text-cyan-500 pl-2 mt-4 text-xl font-semibold">
              TwoDue
            </span>
          </a>
        </div>
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          {isSession ? (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 space-x-8">
              <a
                href="/boards"
                className={classNames(
                  router.pathname == "/boards"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-white",
                  "whitespace-nowrap text-base font-medium text-white hover:text-cyan-600 hover:border-cyan-500"
                )}
              >
                Boards
              </a>
              <a
                href="/profile"
                className={classNames(
                  router.pathname == "/profile"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-white",
                  "whitespace-nowrap text-base font-medium text-white hover:text-cyan-500 hover:border-cyan-500"
                )}
              >
                Profile
              </a>
              <a
                href="/about"
                className={classNames(
                  router.pathname == "/about"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-white",
                  "whitespace-nowrap text-base font-medium text-white hover:text-cyan-500 hover:border-cyan-500"
                )}
              >
                About
              </a>
              <span
                className="cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
                onClick={() => signOut()}
              >
                Sign out
              </span>
            </div>
          ) : (
            <div>
              <a
                href="/login"
                className="whitespace-nowrap text-base font-medium text-gray-300 hover:text-cyan-500"
              >
                Sign in
              </a>
              <a
                href="/register"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
