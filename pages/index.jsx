import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import GettingStarted from "../components/gettingStarted";
import BestUses from "../components/BestUses";

const Home = ({ isSession, user }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={isSession} user={user} />
      <GettingStarted isSession={isSession} />
      <BestUses />
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  let isSession;
  session ? (isSession = true) : (isSession = false);

  //fetch user
  let userData = {}
  if(isSession) {
    const user = await fetch(`${process.env.URL}/api/users/${session.user.id}`);
    userData = await user.json();
  }

  return {
    props: {
      isSession,
      user: userData,
    },
  };
}

export default Home;

// Remove the theme value from session and fetch the user data instead.
