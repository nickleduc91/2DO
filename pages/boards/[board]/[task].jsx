import Header from "../../../components/header";
import TodoList from "../../../components/todoList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../../components/footer"
import Modal from "../../../components/modal"

const Task = ({ board, user, boardTasks, selectedTask, subTasks, parentTasks }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={true} user={user} />
      <TodoList board={board} selectedTask={selectedTask} boardTasks={boardTasks} subTasks={subTasks} parentTasksData={parentTasks}/>
      <Footer />
    </div>
  );
};

export default Task;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const boardId = context.params.board;
  const taskId = context.params.task;

  //fetch for board based off id
  const board = await fetch(`${process.env.URL}/api/boards/${boardId}`);
  if (board.status == 500) {
    return {
      notFound: true,
    };
  }
  const boardData = await board.json();

  //Get specific task
  const task = await fetch(`${process.env.URL}/api/tasks/${taskId}`);
  if (task.status == 500) {
    return {
      notFound: true,
    };
  }
  const taskData = await task.json();

  //fetch user
  const user = await fetch(`${process.env.URL}/api/users/${session.user.id}`);
  let userData = await user.json();

  //fetch for tasks
  const taskIdsString = boardData.tasks.join(",");
  const tasks = await fetch(
    `${process.env.URL}/api/tasks?taskIds=${taskIdsString}`
  );
  const tasksData = await tasks.json();

  //fetch subtasks based on ids in task.subTasks
  let subTasksData = [];
  if (taskData.task.subTasks.length > 0) {
    const idsString = taskData.task.subTasks.join(",");
    const subTasks = await fetch(
      `${process.env.URL}/api/tasks?subTaskIds=${idsString}`
    );
    subTasksData = await subTasks.json();
  }

  return {
    props: {
      board: boardData,
      user: userData,
      boardTasks: tasksData,
      subTasks: subTasksData,
      selectedTask: taskData.task,
      parentTasks: taskData.parentTasks
    },
  };
}
