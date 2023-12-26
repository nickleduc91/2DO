import Header from "../components/header";
import Footer from "../components/footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Hero from "../components/hero";
import BestUses from "../components/BestUses";
import Feature from "../components/feature";
import Head from "next/head";

const Home = ({ isSession, user }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Head>
        <title>TwoDue - Task Organization Tool</title>
        <meta
          property="og:title"
          content="TwoDue - Task Organization Tool"
        ></meta>
        <meta
          name="description"
          content="TwoDue: Your free task app. Sign up, create boards, add tasks, track progress, and edit with ease. Stay organized and boost productivity effortlessly."
        />
        <meta
          property="og:url"
          content="https://twodue.vercel.app/"
        ></meta>
        <meta
          property="og:description"
          content="TwoDue: Your free task app. Sign up, create boards, add tasks, track progress, and edit with ease. Stay organized and boost productivity effortlessly."
        />
        <meta
          name="google-site-verification"
          content="zjpbTDtoVskaGkpSU8Z80QKLGvfL7sAQ5zZ-XEj4Y5E"
        />
      </Head>
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
  let userData = {};
  if (isSession) {
    //fetch user
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
