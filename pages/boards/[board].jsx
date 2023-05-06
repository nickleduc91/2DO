import Header from "../../components/header";
import TodoList from "../../components/todoList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../components/footer";

const Board = ({ board, user }) => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <Header isSession={true} user={user} />
      <TodoList board={board} />
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
  const boardData = await board.json();

  //fetch user
  const user = await fetch(`${process.env.URL}/api/users/${session.user.id}`);
  const userData = await user.json();

  return {
    props: {
      board: boardData,
      user: userData,
    },
  };
}
