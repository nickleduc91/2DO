import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Header from "../../components/header";
import TodoList from "../../components/todoList";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { resetServerContext } from "react-beautiful-dnd";

const Board = ({ board }) => {
  return (
    <div>
      <Header />
      <TodoList board={board} />
    </div>
  );
};

export default Board;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  resetServerContext()
  const id = context.params.board;
  //fetch for boards based off ids
  const board = await fetch(`http://localhost:3000/api/boards/${id}`);
  const boardData = await board.json();

  return {
    props: {
      board: boardData,
    },
  };
}
