import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Fragment } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Link from "next/link";
import { Transition, Menu } from "@headlessui/react";
import React, { useState } from "react";
import axios from "axios";

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
  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: task.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  let numSubLists;
  if (!isSubTask) {
    numSubLists = task?.subTasks?.length;
  } else {
    numSubLists = 0;
  }

  const [dateValue, setDateValue] = useState({
    startDate: task.dueDate,
    endDate: task.dueDate,
  });

  const handleDateChange = (newValue: any) => {
    setDateValue(newValue);
    if (!isSubTask) {
      axios({
        method: "post",
        url: "/api/tasks/updateDueDate",
        data: {
          dueDate: newValue.endDate,
          boardId: boardId,
          taskId: task.id,
        },
      });
    } else {
      axios({
        method: "post",
        url: "/api/tasks/subTasks/updateSubTaskDueDate",
        data: {
          dueDate: newValue.endDate,
          boardId: boardId,
          taskId: task.id,
        },
      });
    }
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

          <div className="border-l-2 border-gray-500 md:pr-0 flex-row justify-between items-end pb-2 pl-2 md:pl-3 h-14 hidden md:flex">
            <div className="pr-3.5 -mb-[0.1rem]">
              <Datepicker
                asSingle
                readOnly
                separator="to"
                aria-label="date"
                minDate={new Date()}
                primaryColor={"cyan"}
                value={dateValue}
                useRange={false}
                onChange={handleDateChange}
                inputClassName={classNames(
                  "tracking-tight text-md h-10 border shadow rounded-full px-4 w-[8.75rem] bg-clip-padding transition ease-in-out focus:outline-none bg-transparent text-black dark:text-white"
                )}
                toggleClassName={
                  "hover:text-cyan-500 absolute right-0 h-full px-3 focus:outline-none dark:text-white text-black mt-[0.09rem]"
                }
                placeholder="Due Date"
              />
            </div>

            {!isSubTask ? (
              <Link
                className={classNames(
                  task.completed
                    ? "text-cyan-500 hover:text-black dark:hover:text-white"
                    : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                  "mr-2 md:mr-4 mb-1.5"
                )}
                href={`/boards/${boardId}/${task.id}`}
              >
                <i className="ri-git-merge-line ri-lg"></i>
                <sub className="font-bold">{numSubLists}</sub>
              </Link>
            ) : null}

            <i
              className={classNames(
                task.completed
                  ? "text-cyan-500 hover:text-black dark:hover:text-white"
                  : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                "ri-delete-bin-2-line ri-xl mr-2 md:mr-4 mb-2.5"
              )}
              onClick={() => handleRemoveTask(task.id)}
            ></i>
            <i
              className={classNames(
                task.completed
                  ? "text-cyan-500 hover:text-black dark:hover:text-white"
                  : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                "ri-drag-move-2-fill ri-xl mr-2 md:mr-4 mb-2.5"
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
                  <Menu.Items className="absolute right-0 w-36 origin-top-right rounded-md bg-white shadow-lg ring-2 ring-cyan-500 ring-opacity-40 focus:outline-none z-40">
                    <Menu.Item>
                      <Link
                        className={classNames(
                          task.completed
                            ? "text-cyan-500 hover:text-black dark:hover:text-white"
                            : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                          "mr-2 md:mr-4 mb-0.5 font-medium group flex w-full items-center rounded-md px-2 py-1 text-sm"
                        )}
                        href={`/boards/${boardId}/${task.id}`}
                      >
                        <p className="mr-1">Open</p>
                        <i className="ri-git-merge-line ri-lg"></i>
                        <sub className="font-bold">{numSubLists}</sub>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="font-medium group flex w-full items-center rounded-md px-2 py-1 text-sm"
                        onClick={() => handleRemoveTask(task.id)}
                      >
                        Delete
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <div className="pb-3 pt-1.5">
                        <Datepicker
                          asSingle
                          readOnly
                          separator="to"
                          aria-label="date"
                          minDate={new Date()}
                          primaryColor={"cyan"}
                          value={dateValue}
                          useRange={false}
                          onChange={handleDateChange}
                          inputClassName={classNames(
                            "tracking-tight text-sm font-medium h-8 border shadow rounded-full px-4 w-[8.9rem] bg-clip-padding transition ease-in-out focus:outline-none bg-transparent text-black dark:text-white"
                          )}
                          toggleClassName={
                            "hover:text-cyan-500 absolute right-0 h-full px-2 focus:outline-none dark:text-white dark:hover:text-cyan-500"
                          }
                          placeholder="Due Date"
                        />
                      </div>
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
