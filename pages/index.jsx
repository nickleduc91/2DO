import Header from "../components/header";
import Footer from "../components/footer";
import Hero from "../components/hero";
import BestUses from "../components/BestUses";
import Feature from "../components/feature";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const [user, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        // Fetch user data only if there is an active session
        try {
          const userResponse = await fetch(
            `${process.env.URL}/api/users/${session.user.id}`
          );
          const userData = await userResponse.json();
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const isSession = !!session;
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
        <meta property="og:url" content="https://twodue.vercel.app/"></meta>
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


export default Home;
