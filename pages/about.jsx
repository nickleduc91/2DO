import Header from "../components/header";
import Image from "next/image";
import DisOrg from "../public/disorg.jpg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../components/footer";
import Head from "next/head";

const About = ({ isSession, user }) => {
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
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-cyan-500">
              Why TwoDue?
            </h2>
            <p className="bg-white dark:bg-slate-800 rounded-3xl mb-4 text-2xl text-black dark:text-white py-6 px-6">
              I developed this website as a personal side project while
              searching for a co-op placement during my third year at
              university. I became deeply passionate about the concept and
              decided to transform it into a complete website. I sincerely hope
              you all find it enjoyable and valuable!
            </p>
            <p className="mb-4 text-2xl text-black dark:text-white bg-white dark:bg-slate-800 rounded-3xl py-6 px-6">
              As a user, you can create different boards, each dedicated to
              various tasks or subjects. Within these boards, you can easily
              generate tasks related to the specific topic. Furthermore, you're
              free to perform actions like moving, completing, editing, or
              deleting tasks as you see fit. You can even create subtasks for
              those tasks. Your data is automatically saved, so you don't have
              to worry about losing any information. Importantly, I do not have
              access to sensitive information like passwords. When you create an
              account, your password is securely hashed, ensuring it remains
              safe and irreversible.
            </p>
            <p className="text-2xl text-black dark:text-white mb-4 bg-white dark:bg-slate-800 rounded-3xl py-6 px-6">
              If you have any tips or ideas to improve on this project, don't
              hesistate to contact me via email at{" "}
              <span className="text-cyan-500">nickleduc@cmail.carleton.ca</span>
            </p>
            <a
              href="https://github.com/nickleduc91/twodue"
              target="_blank"
              className="text-2xl text-cyan-500 hover:text-cyan-700"
            >
              Git Hub Repository for this project{" "}
              <span className="text-cyan-500 ri-links-line hover:text-cyan-700"></span>
            </a>
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

export default About;
