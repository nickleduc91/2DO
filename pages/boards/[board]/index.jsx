import Header from "../../../components/header";
import TodoList from "../../../components/todoList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../../components/footer";

const Board = ({ board, user }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={true} user={user} />
      <TodoList board={board} task={null} />
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

  return {
    props: {
      board: boardData,
      user: session.user,
    },
  };
}
