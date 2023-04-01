import { signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/todo-image.png";
import { useRouter } from "next/router";

import { Fragment } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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

{
  /* <Popover.Group as="nav" className="space-x-10 md:flex">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-gray-500' : 'text-gray-700',
                            'font-dm group inline-flex items-center rounded-md block py-2 pr-6 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700',
                          )}
                        >
                          <span>Socials</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-indigo-600' : 'text-gray-400',
                              'ml-2 h-5 w-5 group-hover:text-indigo-500',
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-4 mt-3 max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative grid gap-6 bg-gray-400 px-5 py-6 sm:gap-8 sm:p-8">
                                {socials.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-200"
                                    target="_blank"
                                  >
                                    <i
                                      className={item.icon}
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                                <a
                                  className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-200"
                                  onClick={copyToClipboard}
                                  href="mailto:nickleduc@cmail.carleton.ca"
                                >
                                  <i
                                    className="ri-mail-send-line ri-xl mt-1 text-indigo-600"
                                    aria-hidden="true"
                                  />

                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                    nickleduc@cmail.carleton.ca
                                    </p>
                                    <p
                                      className={classNames(
                                        isCopied ? '' : 'hidden',
                                        'flex transition-opacity ease-in duration-700 opacity-100 text-indigo-600',
                                      )}
                                    >
                                      Copied to clipboard!
                                    </p>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group> */
}
