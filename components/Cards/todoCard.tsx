import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Transition, Menu } from "@headlessui/react";

interface IFormInput {
  newTask: string;
  editedTask: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const TodoCard = ({
  task,
  handleRemoveTask,
  handleCompleteTask,
  cardClass,
  isSubTask,
  boardId,
}: any) => {
  const router = useRouter();
  const [effect, setEffect] = useState(false);

  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: task.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div>
      <li
        className={classNames(
          isSubTask
            ? "border-b-2 mb-3 w-full mx-auto"
            : "rounded-full shadow-lg bg-white dark:bg-slate-800 mb-3 w-full mx-auto"
        )}
        ref={setNodeRef}
        style={style}
      >
        <div className={cardClass}>
          <div
            className={classNames(
              isSubTask
                ? "w-44 xs:w-72 sm:w-full md:w-48 lg:w-80 xl:w-9/12"
                : "w-60 xs:w-9/12 sm:w-10/12 md:w-8/12 lg:w-9/12 xl:w-4/5",
              "sm:pl-4 flex sm:items-center"
            )}
          >
            <i
              className={classNames(
                task.completed
                  ? "text-cyan-500 hover:text-black dark:hover:text-white ri-checkbox-circle-line"
                  : "hover:text-cyan-500 dark:hover:text-cyan-500 ri-checkbox-blank-circle-line text-black dark:text-white",
                "ri-xl mr-4 flex pt-3.5 md:pt-0"
              )}
              onClick={() =>
                handleCompleteTask(task.id, task.completed, task.edit)
              }
            ></i>
            {isSubTask ? (
              <div className="w-full">
                <p
                  className={classNames(
                    task.completed
                      ? "text-cyan-500"
                      : "text-black dark:text-white",
                    "text-md tracking-tight pl-4 truncate mt-2 md:mt-0 font-normal"
                  )}
                >
                  {task.name}
                </p>
              </div>
            ) : (
              <Link className="w-full" href={`/boards/${boardId}/${task.id}`}>
                <p
                  className={classNames(
                    task.completed
                      ? "text-cyan-500"
                      : "text-black dark:text-white",
                    "text-lg tracking-tight pl-4 truncate mt-2 md:mt-0 font-normal border-b-2 border-transparent hover:border-cyan-500 cursor-pointer"
                  )}
                >
                  {task.name}
                </p>
              </Link>
            )}
          </div>

          <div className="border-l-2 border-gray-500 md:pr-4 flex flex-row justify-between items-end pb-3 pl-2 md:pl-6 h-11 hidden md:flex">
            {!isSubTask ? (
              <Link
                className={classNames(
                  task.completed
                    ? "text-cyan-500 hover:text-black dark:hover:text-white"
                    : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                  "ri-git-merge-line ri-lg mr-2 md:mr-4"
                )}
                href={`/boards/${boardId}/${task.id}`}
              ></Link>
            ) : null}

            <i
              className={classNames(
                task.completed
                  ? "text-cyan-500 hover:text-black dark:hover:text-white"
                  : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                "ri-delete-bin-2-line ri-xl mr-2 md:mr-4"
              )}
              onClick={() => handleRemoveTask(task.id)}
            ></i>
            <i
              className={classNames(
                task.completed
                  ? "text-cyan-500 hover:text-black dark:hover:text-white"
                  : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                task.edit
                  ? "text-cyan-500 hover:text-black dark:hover:text-white"
                  : "",
                "ri-drag-move-2-fill ri-xl mr-2 md:mr-4"
              )}
              {...attributes}
              {...listeners}
            ></i>
          </div>
          <div className="md:hidden border-l-2 border-gray-500 -mr-3 md:pr-4 flex flex-row justify-between items-end pb-1.5 md:pl-6 h-11">
            {!isSubTask ? (
              <Menu
                as="div"
                className="flex-row relative inline-block text-left"
              >
                <Menu.Button className="inline-flex w-full justify-center rounded-md text-cyan-500 px-4 py-2 text-sm font-medium -mt-2">
                  <i
                    className={classNames(
                      task.completed ? "text-cyan-500" : "text-black",
                      "ri-menu-line ri-xl"
                    )}
                  ></i>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Menu.Items className="absolute right-0 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
                    <Menu.Item>
                      <Link
                        className="font-medium group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        href={`${router.asPath}/${task.id}`}
                      >
                        Open
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="font-medium group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => handleRemoveTask(task.id)}
                      >
                        Delete
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <i
                className={classNames(
                  task.completed
                    ? "text-cyan-500 hover:text-black dark:hover:text-white"
                    : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                  "ri-delete-bin-2-line ri-xl pr-1 pb-2 pl-2"
                )}
                onClick={() => handleRemoveTask(task.id)}
              ></i>
            )}
          </div>
        </div>
      </li>
    </div>
  );
};

export default TodoCard;
