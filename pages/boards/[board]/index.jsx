import Header from "../../../components/header";
import TodoList from "../../../components/todoList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../../components/footer";

const Board = ({ board, user, boardTasks }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={true} user={user} />
      <TodoList board={board} selectedTask={null} boardTasks={boardTasks} />
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
  const id = context.params.board;
  //fetch for boards based off ids
  const board = await fetch(`${process.env.URL}/api/boards/${id}`);
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

  return {
    props: {
      board: boardData,
      user: userData,
      boardTasks: tasksData,
    },
  };
}
