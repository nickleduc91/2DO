import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IFormInput {
  newTask: string;
  description: string;
  name: string;
}

const Modal = ({ board, selectedTask, subTasksData }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
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

  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [subTasks, setSubTasks] = useState(subTasksData);
  const [taskName, setTaskName] = useState(selectedTask.name);
  const [taskDescription, setTaskDescription] = useState(
    selectedTask.description
  );

  const cancelButtonRef = useRef(null);

  const close = () => {
    setOpen(false);
    router.push(`/boards/${board._id}`);
  };


  const handleDescriptionChange = (event: any) => {
    console.log(event.target.value)
    axios({
      method: "post",
      url: "/api/tasks/editTaskDescription",
      data: {
        taskDescription: event.target.value,
        taskId: selectedTask._id,
      },
    });
    setTaskDescription(event.target.value);
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

  const handleTaskNameChange = (event: any) => {
    axios({
      method: "post",
      url: "/api/tasks/editTask",
      data: {
        taskName: event.target.value,
        taskId: selectedTask._id,
      },
    });
    setTaskName(event.target.value);
  };

  return (
    <Transition.Root show={open} as={Fragment} appear={true}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => null}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
                <div className="bg-white dark:bg-slate-800 w-full h-[80vh] overflow-y-auto px-4">
                  <button />
                  <div className="flex items-center justify-center -mt-3">
                    <input
                      className="text-center text-cyan-500 font-semibold text-4xl w-2/3 bg-clip-padding transition ease-in-out bg-transparent focus:outline-none focus:border-cyan-500 border-b-2 border-transparent hover:border-cyan-500 py-2"
                      placeholder="Task Name"
                      defaultValue={taskName}
                      onChange={handleTaskNameChange}
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-center">
                    <textarea
                      placeholder="add a description here ..."
                      defaultValue={taskDescription}
                      onChange={handleDescriptionChange}
                      rows={5}
                      className="hover:border-cyan-500 focus:border-cyan-500 resize-none text-center pt-6 bg-transparent text-gray-900 dark:text-white form-control block w-4/5 py-2 text-lg bg-clip-padding transition ease-in-out m-0 dark:focus:border-cyan-500 focus:outline-none border-2 rounded-xl"
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
                <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 flex flex-row">
                  
                  <div className="md:mr-auto flex">
                    <Datepicker
                      popoverDirection="up"
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
                        "text-lg h-12 border shadow rounded-full px-4 md:w-[10rem] w-[8.25rem] bg-clip-padding transition ease-in-out m-0 hover:border-accent focus:border-accent focus:outline-none bg-white dark:bg-slate-800 dark:text-white text-black"
                      )}
                      toggleClassName={
                        "hover:text-cyan-500 absolute right-0 h-full md:px-5 px-2 focus:outline-none dark:text-white text-black"
                      }
                      placeholder="Due Date"
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 ml-auto bg-cyan-500 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-cyan-800 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:cyan-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
