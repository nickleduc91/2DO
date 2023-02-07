import Header from "../../components/header";
import TodoList from "../../components/todoList";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Board = ({ board }) => {
  return (
    <div className="bg-black pb-60">
      <Header isSession={true} />
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
  const id = context.params.board;
  //fetch for boards based off ids
  const board = await fetch(`${process.env.URL}/api/boards/${id}`);
  const boardData = await board.json();

  return {
    props: {
      board: boardData,
    },
  };
}
