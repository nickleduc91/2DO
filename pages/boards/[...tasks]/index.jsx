import Header from "../../../components/header";
import TodoList from "../../../components/todoList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../../components/footer";

const Board = ({ board, user, boardTasks, selectedTask, subTasks, parentTasks }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={true} user={user} />
      <TodoList board={board} selectedTask={selectedTask} boardTasks={boardTasks} subTasks={subTasks} parentTasksData={parentTasks} />
      <Footer />
    </div>
  );
};

export default Board;

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
  const id = context.params.tasks;

  if (id.length > 2) {
    return {
      notFound: true,
    };
  }

  //fetch for boards based off ids
  const board = await fetch(`${process.env.URL}/api/boards/${id[0]}`);
  if (board.status == 500) {
    return {
      notFound: true,
    };
  }
  const boardData = await board.json();

  //fetch user
  const user = await fetch(`${process.env.URL}/api/users/${session.user.id}`);
  let userData = await user.json();

  //fetch for tasks
  let tasksData = [];
  if (boardData.tasks.length > 0) {
    const idsString = boardData.tasks.join(",");
    const tasks = await fetch(
      `${process.env.URL}/api/tasks?taskIds=${idsString}`
    );
    tasksData = await tasks.json();
  }

  // See if we are in a task, so get subtasks

  let subTasksData = [];
  let taskData = null;
  if(context.params.tasks.length == 2) {
    const taskId = context.params.tasks[1];
    
    //Get specific task
    const task = await fetch(`${process.env.URL}/api/tasks/${taskId}`);
    if (task.status == 500) {
        return { notFound: true };
    }
    taskData = await task.json();
    
    //fetch subtasks based on ids in task.subTasks
    if (taskData.task.subTasks.length > 0) {
        const idsString = taskData.task.subTasks.join(",");
        const subTasks = await fetch(
            `${process.env.URL}/api/tasks?subTaskIds=${idsString}`
        );
        subTasksData = await subTasks.json();
    }
  }

  return {
    props: {
      board: boardData,
      user: userData,
      boardTasks: tasksData,
      subTasks: subTasksData,
      selectedTask: taskData == null ? null : taskData.task,
      parentTasks: taskData == null ? null : taskData.parentTasks
    },
  };
}
