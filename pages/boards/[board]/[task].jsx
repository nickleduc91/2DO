import Header from "../../../components/header";
import TodoList from "../../../components/todoList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../../components/footer";

const Task = ({ board, user, task }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={true} user={user} />
      <TodoList board={board} task={task} />
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
  const id = context.params.board;
  const taskId = context.params.task 
  //fetch for board based off id
  const board = await fetch(`${process.env.URL}/api/boards/${id}`);
  const boardData = await board.json();

  //Get specific task
  const task = boardData.tasks.filter(task => task.id == taskId);

  //fetch user
  const user = await fetch(`${process.env.URL}/api/users/${session.user.id}`);
  let userData = await user.json();
  
  return {
    props: {
      board: boardData,
      user: userData,
      task: task[0]
    },
  };
}
