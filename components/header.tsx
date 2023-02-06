import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/todo-image.png";

export default function Header() {
  const { data: session } = useSession();
  return (
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10 border-b-2 border-cyan-500">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a className="flex flex-row" href="/">
              <Image
                className="h-14 w-auto"
                src={Logo}
                alt="2DO Logo"
              />
              <span className="pl-2 mt-4 text-xl font-semibold">TwoDue</span>
            </a>
          </div>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {session ? (
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 space-x-8">
                <a
                  href="/boards"
                  className="whitespace-nowrap text-base font-medium text-cyan-500 hover:text-cyan-600"
                >
                  Boards
                </a>
                <a
                  href="/about"
                  className="whitespace-nowrap text-base font-medium text-cyan-500 hover:text-cyan-600"
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
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
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
