import { signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/todo-image.png";
import { useRouter } from "next/router";

import { Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";

const headers = [
  {
    name: "Boards",
    href: "/boards",
  },
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "About",
    href: "/about",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ isSession }: any) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10">
        <div>
          <a className="flex flex-row" href="/">
            <Image className="h-14 w-auto" src={Logo} alt="2DO Logo" />
            <span className="text-cyan-500 pl-2 mt-4 text-xl font-semibold">
              TwoDue
            </span>
          </a>
        </div>
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          {isSession ? (
            <div className="items-center justify-end md:flex md:flex-1 lg:w-0 space-x-8">
              <a
                href="/boards"
                className={classNames(
                  router.pathname == "/boards"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-white",
                  "text-base font-medium text-white transition duration-200 ease-in-out hover:text-cyan-500 hover:border-cyan-500"
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
                  "text-base font-medium text-white transition duration-200 ease-in-out hover:text-cyan-500 hover:border-cyan-500"
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
                  "text-base font-medium text-white transition duration-200 ease-in-out hover:text-cyan-500 hover:border-cyan-500"
                )}
              >
                About
              </a>
              <span
                className="cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700"
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
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
        <div className="visible md:invisible">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white">
                <i className="ri-menu-line ri-2x hover:text-cyan-500"></i>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {headers.map((item: any) => (
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={`${
                          active ? "bg-cyan-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
