import Header from "../../components/header";
import BoardsList from "../../components/boardsList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../../components/footer";
import Head from 'next/head'

const BoardsPage = ({ user, boards }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Head>
        <title>Boards - TwoDue</title>
        <meta property="og:title" content="Boards - TwoDue"></meta>
        <meta
          name="description"
          content="Explore your personalized boards on TwoDue! Navigate your tasks seamlessly by accessing all your boards in one place. Stay organized and in control with TwoDue!"
        />
        <meta
          property="og:description"
          content="Explore your personalized boards on TwoDue! Navigate your tasks seamlessly by accessing all your boards in one place. Stay organized and in control with TwoDue!"
        />
        <meta
          property="og:url"
          content="https://twodue.vercel.app/boards"
        ></meta>
      </Head>
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
