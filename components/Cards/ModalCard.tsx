import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import TodoCard from "./todoCard";

interface IFormInput {
  newTask: string;
  description: string;
  name: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ModalCard = ({ handleClose, task, handleCompleteTask, boardId }: any) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [subTasks, setSubTasks] = useState(task.subTasks ?? []);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);

  const handleTaskNameChange = (event: any) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setTaskDescription(event.target.value);
  };

  const handleCloseModal = (e: any) => {
    if (e.target.id === "wrapper") handleClose();
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
        boardId: boardId,
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
        boardId: boardId,
        taskName,
        taskDescription,
      },
    });
    handleClose();
  };

  const removeTask = (id: any) => {
    const updatedTasks = subTasks.filter((task: any) => task.id != id);
    axios({
      method: "post",
      url: "/api/tasks/subTasks/removeSubTask",
      data: {
        parentId: task.id,
        boardId: boardId,
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
        boardId: boardId,
        tasks: updatedTasks,
      },
    });
    setSubTasks(updatedTasks);
  };

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleCloseModal}
      id="wrapper"
    >
      <div className="w-[1200px] h-[750px]">
        <div className="bg-white p-2 rounded-2xl h-5/6 pt-4">
          <textarea
            className="resize-none text-center text-cyan-500 font-semibold text-3xl w-full rounded-xl bg-clip-padding transition ease-in-out bg-transparent focus:outline-none"
            placeholder="Task Name"
            rows={1}
            defaultValue={taskName}
            onChange={handleTaskNameChange}
          />
          <div className="mt-12 ml-4 px-4 pt-2 grid grid-cols-9 gap-8">
            <div className="col-span-3">
              <h4 className="text-center text-lg font-semibold">Description</h4>
              <textarea
                placeholder="add a description here ..."
                defaultValue={taskDescription}
                onChange={handleDescriptionChange}
                rows={16}
                className="resize-none text-center pt-6 text-lg bg-transparent text-gray-600 dark:text-white form-control block w-full py-2 text-lg bg-clip-padding transition ease-in-out m-0  dark:focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="col-span-6">
              <h4 className="text-center text-lg font-semibold">Sub-Tasks</h4>
              <div className="dark:bg-slate-800 mb-8">
                <div className="pl-4 py-5 flex justify-between border-transparent bg-transparent">
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
                      className="text-base bg-transparent text-black dark:text-white border-b-2 border-black dark:border-white form-control block w-full px-4 py-1 text-lg bg-clip-padding transition ease-in-out m-0 focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none"
                      placeholder="New sub-task"
                    />
                  </form>
                </div>
                <ul className="flex flex-col h-[400px]  overflow-y-auto">
                  {subTasks.map((task: any) => (
                    <TodoCard
                      key={task.id}
                      task={task}
                      handleRemoveTask={removeTask}
                      handleCompleteTask={completeTask}
                      cardClass="px-2 flex justify-between border-transparent bg-transparent"
                      isSubTask={true}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2xl border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700"
              type="button"
              onClick={() => submitModal()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
