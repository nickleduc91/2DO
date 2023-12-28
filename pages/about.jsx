import Header from "../components/header";
import Image from "next/image";
import DisOrg from "../public/disorg.jpg";
import Footer from "../components/footer";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const About = () => {
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
        <title>About Us - TwoDue</title>
        <meta property="og:title" content="About Us - TwoDue"></meta>
        <meta
          name="description"
          content="Discover TwoDue: Your free task organization app. Sign up to create boards, add and edit tasks effortlessly. Boost productivity with ease."
        />
        <meta
          property="og:description"
          content="Discover TwoDue: Your free task organization app. Sign up to create boards, add and edit tasks effortlessly. Boost productivity with ease."
        />
        <meta
          property="og:url"
          content="https://twodue.vercel.app/about"
        ></meta>
      </Head>
      <Header isSession={isSession} user={user} />
      <section className=" font-base">
        <div className="gap-32 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-3 lg:py-8 lg:px-6">
          <div className="tracking-tight col-span-2">
            <div className="flex flex-row mb-6">
              <h2 className=" text-4xl tracking-tight font-bold text-cyan-500 mr-12">
                Why TwoDue?
              </h2>
              <a
                href="https://github.com/nickleduc91/twodue"
                target="_blank"
                className="text-2xl text-cyan-500 hover:text-cyan-700 mt-1.5"
              >
                Git Hub Repository for this project{" "}
                <span className="text-cyan-500 ri-links-line hover:text-cyan-700"></span>
              </a>
            </div>

            <p className="bg-white dark:bg-slate-800 rounded-3xl mb-6 text-xl text-black dark:text-white py-6 px-6 shadow-lg font-normal">
              I crafted this website as a personal side project while actively
              seeking a co-op placement in my third year at university. The
              initial spark of inspiration grew into a profound passion for the
              concept, compelling me to evolve it into a fully-fledged website.
              I genuinely hope that you find it not only enjoyable but also
              valuable!
            </p>
            <p className="bg-white dark:bg-slate-800 rounded-3xl mb-6 text-xl text-black dark:text-white py-6 px-6 shadow-lg font-normal">
              As a user, you have the flexibility to create distinct boards,
              each tailored to different tasks or subjects. Within these boards,
              seamlessly generate tasks related to specific topics. Take control
              with the ability to perform actions such as moving, completing,
              editing, or deleting tasks according to your preferences. For
              added organization, you can even create subtasks. Your data is
              automatically saved, alleviating concerns about information loss.
              Importantly, rest assured that sensitive information like
              passwords is beyond my reach. When you create an account, your
              password undergoes secure hashing, guaranteeing its safety and
              irreversibility.
            </p>
          </div>
          <div>
            <Image
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src={DisOrg}
              alt="office content 2"
              width={600}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
