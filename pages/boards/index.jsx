import Header from "../../components/header";
import BoardsList from "../../components/boardsList";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const BoardsPage = ({ userId, boards }) => {
  return (
    <div className="bg-black pb-96">
      <Header />
      <BoardsList userId={userId} boards={boards} />
    </div>
  );
};

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

  //fetch for boards based off id
  const boards = await fetch(
    `${process.env.URL}/api/boards?userId=${session.user.id}`
  );
  const boardsData = await boards.json();

  return {
    props: {
      userId: session.user.id,
      boards: boardsData.data,
    },
  };
}

export default BoardsPage;
