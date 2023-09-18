import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import TodoCard from "./Cards/todoCard";
import Sidebar from "./sideBar";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";

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
  editedTask: string;
}

const Tasks = ({ board, task }: any) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [tasks, setTask] = useState(board.tasks);

  const onSubmit: SubmitHandler<IFormInput> = async ({ newTask }) => {
    if (!newTask || /^\s*$/.test(newTask)) {
      return;
    }
    setTask([
      { name: newTask, completed: false, id: Date.now(), subTasks: [] },
      ...tasks,
    ]);
    axios({
      method: "post",
      url: "/api/tasks/addTask",
      data: {
        newTask: {
          name: newTask,
          completed: false,
          id: Date.now(),
          description: null,
          subTasks: [],
        },
        boardId: board._id,
      },
    });
    reset();
  };

  const removeTask = (id: any) => {
    const updatedTasks = tasks.filter((task: any) => task.id != id);
    axios({
      method: "post",
      url: "/api/tasks/removeTask",
      data: {
        taskId: id,
        boardId: board._id,
        tasks: updatedTasks,
      },
    });
    setTask(updatedTasks);
  };

  const completeTask = (id: any, completed: boolean, edit: boolean) => {
    if (edit) return;
    let index = 0;
    const updatedTasks = tasks.map((task: any, idx: number) => {
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
      url: "/api/tasks/completeTask",
      data: {
        boardId: board._id,
        tasks: updatedTasks,
      },
    });
    setTask(updatedTasks);
  };

  const handleDragEnd = ({ active, over }: any) => {
    let updatedTasks;
    if (active.id !== over.id) {
      setTask((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id);
        const newIndex = items.findIndex((item: any) => item.id === over.id);
        updatedTasks = arrayMove(items, oldIndex, newIndex);
        axios({
          method: "post",
          url: "/api/tasks/completeTask",
          data: {
            boardId: board._id,
            tasks: updatedTasks,
          },
        });
        return updatedTasks;
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div className="mx-auto w-full max-w-5xl">
      {task ? <Sidebar board={board} task={task} /> : null}
      <h1 className="pt-5 pb-4 font-semibold text-4xl text-cyan-500 text-center">
        {board.name}
      </h1>
      <div className="rounded-xl shadow-xl bg-white dark:bg-slate-800 mb-8">
        <div className="py-4 px-4 flex justify-between border-l-4 border-transparent bg-transparent">
          <form
            className="sm:pl-4 pr-8 flex sm:items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <button
              className="ri-add-line ri-2x hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white"
              type="submit"
            ></button>
            <input
              type="text"
              {...register("newTask")}
              className="bg-transparent text-black dark:text-white border-b-2 border-black dark:border-white ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none"
              placeholder="New task"
            />
          </form>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToFirstScrollableAncestor]}
      >
        <ul className="flex flex-col">
          <SortableContext
            items={tasks.map((task: any) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task: any) => (
              <TodoCard
                key={task.id}
                task={task}
                handleRemoveTask={removeTask}
                handleCompleteTask={completeTask}
                boardId={board._id}
                cardClass="md:py-1 px-4 flex justify-between border-transparent bg-transparent"
                isSubTask={false}
              />
            ))}
          </SortableContext>
        </ul>
      </DndContext>
    </div>
  );
};

export default Tasks;
