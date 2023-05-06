import { useForm } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  handleEditTask,
  handleSubmitEditedTask,
}: any) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: task.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      className={classNames(
        task.completed ? "" : "",
        "rounded-xl border border-gray-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-800 mb-7"
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className="py-2 md:py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent"
      >
        <div className="sm:pl-4 pr-8 flex sm:items-center w-full">
          <i
            className={classNames(
              task.completed
                ? "text-cyan-500 hover:text-black dark:hover:text-white ri-checkbox-circle-line"
                : task.edit
                ? ""
                : "hover:text-cyan-500 dark:hover:text-cyan-500 ri-checkbox-blank-circle-line text-black dark:text-white",
              "ri-2x mr-4 flex"
            )}
            onClick={() =>
              handleCompleteTask(task.id, task.completed, task.edit)
            }
          ></i>
          {!task?.edit ? (
            <p
              className={classNames(
                task.completed ? "text-cyan-500" : "text-black dark:text-white",
                "text-lg tracking-tight pl-4 truncate"
              )}
            >
              {task.name}
            </p>
          ) : (
            <form
              className="sm:pl-4 pr-8 flex sm:items-center w-full"
              onSubmit={handleSubmit((data) =>
                handleSubmitEditedTask(data, task.id)
              )}
            >
              <button
                className="ri-add-line ri-2x hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white"
                type="submit"
              ></button>
              <input
                type="text"
                {...register("editedTask")}
                className="dark:bg-slate-800 text-black dark:text-white bg-white border-b-2 ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:border-cyan-500 focus:outline-none"
                placeholder={task.name}
              />
            </form>
          )}
        </div>

        <div className="pr-4 flex flex-row justify-between items-end mb-3">
          {!task.completed && (
            <i
              className={classNames(
                task.completed
                  ? "text-cyan-500"
                  : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
                task.edit ? "text-cyan-500 hover:text-cyan-500" : "",
                "ri-pencil-line ri-xl mr-4 mb-1"
              )}
              onClick={() => handleEditTask(task.id, task.edit)}
            ></i>
          )}
          <i
            className={classNames(
              task.completed
                ? "text-cyan-500 hover:text-black dark:hover:text-white"
                : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
              "ri-delete-bin-2-line ri-xl mr-4 mb-1"
            )}
            onClick={() => handleRemoveTask(task.id)}
          ></i>
          <i
            className={classNames(
              task.completed
                ? "text-cyan-500 hover:text-black dark:hover:text-white"
                : "hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white",
              task.edit ? "text-cyan-500 hover:text-black dark:hover:text-white" : "",
              "ri-menu-line ri-xl mr-4 mb-1"
            )}
          ></i>
        </div>
      </div>
    </li>
  );
};

export default TodoCard;
