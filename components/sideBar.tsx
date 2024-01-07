import React, { useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import TodoCard from "./Cards/todoCard";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";

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

const Sidebar = ({ board, selectedTask, subTasksData }: any) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [subTasks, setSubTasks] = useState(subTasksData);
  const [taskName, setTaskName] = useState(selectedTask.name);
  const [taskDescription, setTaskDescription] = useState(
    selectedTask.description
  );

  const [dateValue, setDateValue] = useState({
    startDate: selectedTask.dueDate,
    endDate: selectedTask.dueDate,
  });

  const formatDate = (newValue: any) => {
    if (newValue.endDate) {
      const endDate = dayjs(newValue.endDate);
      // Check if the year is the same
      if (dayjs().isSame(endDate, "year")) {
        // Check if the date is within the current week
        if (dayjs().isSame(endDate, "week")) {
          return "dddd";
        } else {
          return "MMM D";
        }
      } else {
        return "MMM D, YYYY";
      }
    }
    return "MMM D, YYYY";
  };

  const [displayFormat, setDisplayFormat] = useState(formatDate(dateValue));

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
    const task = await axios({
      method: "post",
      url: "/api/tasks/addTask",
      data: {
        newTask: {
          name: newTask,
          completed: false,
          description: null,
          subTasks: [],
          dueDate: null,
          userId: board.userId,
          boardId: board._id,
          isSubTask: true,
        },
        parentId: selectedTask._id,
      },
    });
    setSubTasks([task.data, ...subTasks]);
    reset();
  };

  const submitModal = () => {
    axios({
      method: "post",
      url: "/api/tasks/editTask",
      data: {
        taskId: selectedTask._id,
        boardId: board._id,
        taskName,
        taskDescription,
      },
    }).then(close);
  };

  const removeTask = (id: any) => {
    const updatedTasks = subTasks.filter((task: any) => task._id != id);
    console.log(id);
    axios({
      method: "post",
      url: "/api/tasks/removeTask",
      data: {
        taskId: id,
        boardId: board._id,
        isSubTask: true,
        parentId: selectedTask._id,
      },
    });
    setSubTasks(updatedTasks);
  };

  const completeTask = (id: any, completed: boolean) => {
    let index = 0;
    const updatedTasks = subTasks.map((task: any, idx: number) => {
      if (task._id == id) {
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
      url: "/api/tasks/completeTask",
      data: {
        taskId: id,
        status: completed,
        boardId: board._id,
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
    setDisplayFormat(formatDate(newValue));
    setDateValue(newValue);
    axios({
      method: "post",
      url: "/api/tasks/updateDueDate",
      data: {
        dueDate: newValue.endDate,
        boardId: board._id,
        taskId: selectedTask._id,
      },
    });
  };

  const handleDragEnd = ({ active, over }: any) => {
    let updatedTasks;
    if (active.id !== over.id) {
      setSubTasks((items: any) => {
        const oldIndex = items.findIndex((item: any) => item._id === active.id);
        const newIndex = items.findIndex((item: any) => item._id === over.id);
        updatedTasks = arrayMove(items, oldIndex, newIndex);
        axios({
          method: "post",
          url: "/api/tasks/setOrder",
          data: {
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
      <Dialog open={true} onClose={() => null}>
        <Transition
          appear={true}
          show={showSidebar}
          className="max-w-7xl top-0 right-0 w-[95vw] md:w-[70vw] bg-white dark:bg-slate-800 border-l-8 border-gray-200 dark:border-gray-700 px-8 pt-4  text-white fixed h-full z-40"
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
                  selectedTask.name !== taskName ||
                  selectedTask.description !== taskDescription
                    ? submitModal
                    : close
                }
              >
                {selectedTask.name !== taskName ||
                selectedTask.description !== taskDescription
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
                  displayFormat={displayFormat}
                  inputClassName={classNames(
                    "text-lg h-12 border shadow rounded-full px-4 w-[10rem] bg-clip-padding transition ease-in-out m-0 hover:border-accent focus:border-accent focus:outline-none bg-transparent dark:text-white text-black"
                  )}
                  toggleClassName={
                    "hover:text-cyan-500 absolute right-0 h-full px-3 focus:outline-none dark:text-white text-black"
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
                    items={subTasks.map((task: any) => task._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className="flex flex-col">
                      {subTasks.map((task: any) => (
                        <TodoCard
                          key={task._id}
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
