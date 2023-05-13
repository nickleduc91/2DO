import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

export default function Header({ isSession, user }: any) {
  const router = useRouter();
  const [theme, setTheme] = useState(user.theme ?? "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = async () => {
    setTheme(theme === "dark" ? "light" : "dark");
    await axios({
      method: "post",
      url: "/api/theme",
      data: {
        theme: theme === "dark" ? "light" : "dark",
        userId: user._id,
      },
    });
  };


  return (
    <div className="mx-auto max-w-7xl px-6 sticky">
      <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10">
        <div>
          <a className="flex flex-row" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="dark:fill-white hover:fill-cyan-500 dark:hover:fill-cyan-500 h-12 w-12 mt-0.5"
            >
              <path d="M8.00008 6V9H5.00008V6H8.00008ZM3.00008 4V11H10.0001V4H3.00008ZM13.0001 4H21.0001V6H13.0001V4ZM13.0001 11H21.0001V13H13.0001V11ZM13.0001 18H21.0001V20H13.0001V18ZM10.7072 16.2071L9.29297 14.7929L6.00008 18.0858L4.20718 16.2929L2.79297 17.7071L6.00008 20.9142L10.7072 16.2071Z"></path>
            </svg>
            <span className="text-gray-800 dark:text-white pl-1 text-4xl font-bold tracking-tight border-b-4 border-cyan-500">
              TwoDue
            </span>
          </a>
        </div>
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          {isSession ? (
            <div className="bg-white dark:bg-slate-800 rounded-full py-3 px-6">
              <a
                href="/boards"
                className={classNames(
                  router.pathname == "/boards"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-transparent",
                  "mr-8 text-xl font-medium text-black dark:text-white transition duration-200 ease-in-out hover:text-cyan-500 dark:hover:text-cyan-500 hover:border-cyan-500 dark:hover:border-cyan-500"
                )}
              >
                Boards
              </a>
              <a
                href="/profile"
                className={classNames(
                  router.pathname == "/profile"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-transparent",
                  "mr-8 text-xl font-medium text-black dark:text-white transition duration-200 ease-in-out hover:text-cyan-500 dark:hover:text-cyan-500 hover:border-cyan-500 dark:hover:border-cyan-500"
                )}
              >
                Profile
              </a>
              <a
                href="/about"
                className={classNames(
                  router.pathname == "/about"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-transparent",
                  "mr-3 text-xl font-medium text-black dark:text-white transition duration-200 ease-in-out hover:text-cyan-500 dark:hover:text-cyan-500 hover:border-cyan-500 dark:hover:border-cyan-500"
                )}
              >
                About
              </a>
              <span
                className="cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2xl border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700"
                onClick={() => signOut()}
              >
                Sign out
              </span>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-full py-3 px-6">
              <a
                href="/about"
                className={classNames(
                  router.pathname == "/about"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-transparent",
                  "mr-8 text-xl font-medium text-black dark:text-white transition duration-200 ease-in-out hover:text-cyan-500 dark:hover:text-cyan-500 hover:border-cyan-500 dark:hover:border-cyan-500"
                )}
              >
                About
              </a>
              <a
                href="/login"
                className={classNames(
                  router.pathname == "/login"
                    ? "border-b-2 border-cyan-500"
                    : "border-b-2 border-transparent",
                  "text-xl font-medium text-black dark:text-white transition duration-200 ease-in-out hover:text-cyan-500 dark:hover:text-cyan-500 hover:border-cyan-500 dark:hover:border-cyan-500"
                )}
              >
                Sign in
              </a>
              <a
                href="/register"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-cyan-700"
              >
                Sign Up
              </a>
            </div>
          )}
          <button
            onClick={handleThemeSwitch}
            className={classNames(
              theme == "light" ? "ri-moon-line" : "ri-sun-line",
              "hover:text-cyan-500 dark:hover:text-cyan-500 ri-xl ml-4 text-xl font-medium text-black dark:text-white transition duration-200 ease-in-out "
            )}
          ></button>
        </div>
        <div className="visible md:invisible flex-row">
          <Menu as="div" className="flex-row relative inline-block text-left">
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
          <button
            onClick={handleThemeSwitch}
            className={classNames(
              theme == "light" ? "ri-sun-line" : "ri-moon-line",
              "flex-row hover:text-cyan-500 dark:hover:text-cyan-500 ri-xl ml-4 text-xl font-medium text-black dark:text-white transition duration-200 ease-in-out "
            )}
          ></button>
        </div>
      </div>
    </div>
  );
}
