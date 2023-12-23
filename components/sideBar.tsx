import React, { useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import TodoCard from "./Cards/todoCard";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import Datepicker from "react-tailwindcss-datepicker";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface IFormInput {
  newTask: string;
  description: string;
  name: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ board, task }: any) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [subTasks, setSubTasks] = useState(task.subTasks ?? []);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);

  const [dateValue, setDateValue] = useState({
    startDate: task.dueDate,
    endDate: task.dueDate,
  });

  const handleTaskNameChange = (event: any) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    if (event.target.value == "") {
      setTaskDescription(null);
    } else {
      setTaskDescription(event.target.value);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async ({ newTask }) => {
    if (!newTask || /^\s*$/.test(newTask)) {
      return;
    }
    setSubTasks([
      { name: newTask, completed: false, id: Date.now() },
      ...subTasks,
    ]);
    axios({
      method: "post",
      url: "/api/tasks/subTasks/addSubTask",
      data: {
        newTask: {
          name: newTask,
          completed: false,
          id: Date.now(),
        },
        boardId: board._id,
        parentId: task.id,
      },
    });
    reset();
  };

  const submitModal = () => {
    axios({
      method: "post",
      url: "/api/tasks/editTask",
      data: {
        taskId: task.id,
        boardId: board._id,
        taskName,
        taskDescription,
      },
    }).then(close);
  };

  const removeTask = (id: any) => {
    const updatedTasks = subTasks.filter((task: any) => task.id != id);
    axios({
      method: "post",
      url: "/api/tasks/subTasks/removeSubTask",
      data: {
        parentId: task.id,
        boardId: board._id,
        tasks: updatedTasks,
      },
    });
    setSubTasks(updatedTasks);
  };

  const completeTask = (id: any, completed: boolean) => {
    let index = 0;
    const updatedTasks = subTasks.map((task: any, idx: number) => {
      if (task.id == id) {
        index = idx;
        completed ? (task.completed = false) : (task.completed = true);
      }
      return task;
    });
    if (!completed) {
      updatedTasks.push(updatedTasks.splice(index, 1)[0]);
    }
    axios({
      method: "post",
      url: "/api/tasks/subTasks/completeSubTask",
      data: {
        parentId: task.id,
        boardId: board._id,
        tasks: updatedTasks,
      },
    });
    setSubTasks(updatedTasks);
  };

  const close = () => {
    setShowSidebar(false);
    router.push(`/boards/${board._id}`);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDateChange = (newValue: any) => {
    setDateValue(newValue);
    axios({
      method: "post",
      url: "/api/tasks/updateDueDate",
      data: {
        dueDate: newValue.endDate,
        boardId: board._id,
        taskId: task.id,
      },
    });
  };

  const handleDragEnd = ({ active, over }: any) => {
    let updatedTasks;
    if (active.id !== over.id) {
      setSubTasks((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id);
        const newIndex = items.findIndex((item: any) => item.id === over.id);
        updatedTasks = arrayMove(items, oldIndex, newIndex);
        axios({
          method: "post",
          url: "/api/tasks/subTasks/completeSubTask",
          data: {
            parentId: task.id,
            boardId: board._id,
            tasks: updatedTasks,
          },
        });
        return updatedTasks;
      });
    }
  };

  return (
    <>
      <Dialog open={true} onClose={close}>
        <Transition
          appear={true}
          show={showSidebar}
          className="max-w-7xl top-0 right-0 w-[95vw] md:w-[65vw] bg-white dark:bg-slate-800 border-l-8 border-gray-200 dark:border-gray-700 px-8 pt-4  text-white fixed h-full z-40"
          enter="transform transition ease-in-out duration-150"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-150"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="overflow-y-auto h-full">
            <div className="group relative flex items-center justify-between pb-3">
              <button
                className="inline-block px-6 py-2.5 mr-2 bg-cyan-500 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-cyan-800 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:cyan-800 active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                role="button"
                onClick={
                  task.name !== taskName || task.description !== taskDescription
                    ? submitModal
                    : close
                }
              >
                {task.name !== taskName ||
                task.description !== taskDescription ||
                task.subTasks !== subTasks
                  ? "Save & Close"
                  : "Close"}
              </button>
              <div className="ml-auto flex">
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
                    "tracking-tight text-md bg-clip-padding transition ease-in-out  hover:border-accent focus:border-accent focus:outline-none md:w-[5rem] w-[6rem] bg-transparent font-medium dark:text-white"
                  )}
                  toggleClassName={
                    "hover:text-cyan-500 md:px-3 focus:outline-none dark:text-white dark:hover:text-cyan-500"
                  }
                  placeholder="Due Date"
                />
              </div>
            </div>

            <input
              className="text-center text-cyan-500 font-semibold text-4xl w-full bg-clip-padding transition ease-in-out bg-transparent focus:outline-none focus:border-cyan-500 border-b-2 border-transparent hover:border-cyan-500 py-2"
              placeholder="Task Name"
              defaultValue={taskName}
              onChange={handleTaskNameChange}
            />
            <div className="pt-8">
              <textarea
                placeholder="add a description here ..."
                defaultValue={taskDescription}
                onChange={handleDescriptionChange}
                rows={5}
                className="hover:border-cyan-500 focus:border-cyan-500 resize-none text-center pt-6 bg-transparent text-gray-900 dark:text-white form-control block w-full py-2 text-lg bg-clip-padding transition ease-in-out m-0 dark:focus:border-cyan-500 focus:outline-none border-2 rounded-xl"
              />
            </div>
            <div className="w-full">
              <div className="pb-4">
                <div className="pl-4 py-8 flex justify-between border-transparent bg-transparent">
                  <form
                    className="pr-8 flex sm:items-center w-full"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <button
                      className="ri-add-line ri-xl hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white"
                      type="submit"
                    ></button>
                    <input
                      type="text"
                      {...register("newTask")}
                      className="bg-transparent text-black dark:text-white border-b-2 border-black dark:border-white form-control block w-full px-4 py-1 text-lg bg-clip-padding transition ease-in-out m-0 focus:border-cyan-500 dark:focus:border-cyan-500 hover:border-cyan-500 focus:outline-none"
                      placeholder="New sub-task"
                    />
                  </form>
                </div>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToFirstScrollableAncestor]}
                >
                  <SortableContext
                    items={subTasks.map((task: any) => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className="flex flex-col">
                      {subTasks.map((task: any) => (
                        <TodoCard
                          key={task.id}
                          task={task}
                          handleRemoveTask={removeTask}
                          handleCompleteTask={completeTask}
                          cardClass="px-2 pb-3 flex justify-between border-transparent bg-transparent"
                          isSubTask={true}
                          boardId={board._id}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>
        </Transition>
      </Dialog>
    </>
  );
};

export default Sidebar;
