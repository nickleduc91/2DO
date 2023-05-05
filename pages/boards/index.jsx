import Header from "../../components/header";
import BoardsList from "../../components/boardsList";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../components/footer";

const BoardsPage = ({ userId, boards }) => {
  return (
    <div className="bg-black min-h-screen">
      <Header isSession={true} />
      <BoardsList userId={userId} boards={boards} />
      <Footer />
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
