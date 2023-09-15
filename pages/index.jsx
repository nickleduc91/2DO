import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Hero from "../components/hero";
import BestUses from "../components/BestUses";
import Feature from "../components/feature";

const Home = ({ isSession, user }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={isSession} user={user} />
      <Hero isSession={isSession} />
      <Feature />
      <BestUses />
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  let isSession;
  session ? (isSession = true) : (isSession = false);

  return {
    props: {
      isSession,
      user: isSession ? session.user : {},
    },
  };
}

export default Home;
