import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import GettingStarted from "../components/gettingStarted";
import BestUses from "../components/BestUses";

const Home = ({ isSession }) => {
  return (
    <div className="bg-black min-h-screen">
      <Header isSession={isSession} />
      <GettingStarted isSession={isSession}/>
      <BestUses />
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  let isSession;
  session ? (isSession = true) : (isSession = false);

  return {
    props: {
      isSession,
    },
  };
}

export default Home;
