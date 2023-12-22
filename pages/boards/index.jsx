import Header from "../../components/header";
import BoardsList from "../../components/boardsList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../components/footer";

const BoardsPage = ({ user, boards }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={true} user={user} />
      <BoardsList userId={user._id} boards={boards} />
      <Footer />
    </div>
  );
};

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

  //fetch user
  const user = await fetch(`${process.env.URL}/api/users/${session.user.id}`);
  let userData = await user.json();
  
  //fetch for boards based off id
  const boards = await fetch(
    `${process.env.URL}/api/boards?userId=${userData._id}`
  );
  const boardsData = await boards.json();

  return {
    props: {
      user: userData,
      boards: boardsData,
    },
  };
}

export default BoardsPage;
