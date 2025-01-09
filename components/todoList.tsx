import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import TodoCard from "./Cards/todoCard";
import Sidebar from "./sideBar";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Modal from "./modal";

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

const Tasks = ({ board, selectedTask, boardTasks, subTasks, parentTasksData }: any) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [tasks, setTask] = useState(boardTasks);
  const [boardName, setBoardName] = useState(board.name);

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
          isSubTask: false,
        },
      },
    });
    setTask([task.data, ...tasks]);
    reset();
  };

  const removeTask = (id: any) => {
    const updatedTasks = tasks.filter((task: any) => task._id != id);
    axios({
      method: "post",
      url: "/api/tasks/removeTask",
      data: {
        taskId: id,
        boardId: board._id,
        isSubTask: false,
      },
    });
    setTask(updatedTasks);
  };

  const completeTask = (id: any, completed: boolean) => {
    let index = 0;
    const updatedTasks = tasks.map((task: any, idx: number) => {
      if (task._id == id) {
        index = idx;
        completed ? (task.completed = false) : (task.completed = true);
      }
      return task;
    });

    axios({
      method: "post",
      url: "/api/tasks/completeTask",
      data: {
        taskId: id,
        status: completed,
        boardId: board._id,
      },
    });
    setTask(updatedTasks);
  };

  const handleDragEnd = ({ active, over }: any) => {
    let updatedTasks;
    if (active.id !== over.id) {
      setTask((items: any) => {
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleBoardNameChange = (event: any) => {
    axios({
      method: "post",
      url: "/api/boards/editBoard",
      data: {
        boardName: event.target.value,
        boardId: board._id,
      },
    });
    setBoardName(event.target.value);
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {selectedTask ? (
        <Modal
          board={board}
          selectedTask={selectedTask}
          subTasksData={subTasks}
          parentTasksData={parentTasksData}
          handleSetTask={setTask}
          tasks={tasks}
        />
      ) : null}
      <div>
        <input
          className="mb-4 pt-5 pb-1 font-semibold text-4xl text-cyan-500 text-center w-full bg-transparent focus:outline-none focus:border-cyan-500 border-b-2 border-transparent hover:border-cyan-500"
          placeholder="Board Name"
          defaultValue={boardName}
          onChange={handleBoardNameChange}
        />
      </div>
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
              className="bg-transparent hover:border-cyan-500 text-black dark:text-white border-b-2 border-black dark:border-white ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none"
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
            items={tasks.map((task: any) => task._id)}
            strategy={verticalListSortingStrategy}
          >
            <TransitionGroup>
              {tasks.map((task: any) => (
                <CSSTransition
                  key={task._id}
                  timeout={150}
                  classNames={"example"}
                >
                  <TodoCard
                    key={task._id}
                    task={task}
                    handleRemoveTask={removeTask}
                    handleCompleteTask={completeTask}
                    boardId={board._id}
                    cardClass="md:py-1 px-4 flex justify-between border-transparent bg-transparent"
                    isSubTask={false}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </SortableContext>
        </ul>
      </DndContext>
    </div>
  );
};

export default Tasks;
