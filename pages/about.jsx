import Header from "../components/header";
import Image from "next/image";
import Org from "../public/org.jpg";
import DisOrg from "../public/disorg.jpg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Footer from "../components/footer";

const About = ({ isSession, user }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Header isSession={isSession} user={user} />
      <section className="-mb-4 font-medium">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-6">
          <div className="tracking-wide">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-cyan-500">
              Why TwoDue?
            </h2>
            <p className="bg-white dark:bg-slate-800 rounded-3xl mb-4 text-2xl text-black dark:text-white py-6 px-6">
              This website was created as a little side project during my hunt
              for a co-op placement within my third year of university. I ended
              up being really hooked onto this idea and started to create a full
              website out of it. I hope you guys enjoy and find this useful!
            </p>
            <p className="mb-4 text-2xl text-black dark:text-white bg-white dark:bg-slate-800 rounded-3xl py-6 px-6">
              As a user, you can create different boards which relate to
              different tasks in your every day life, such as for school. And
              then within these boards, you can create different tasks that
              relate to that subject. You can then move, complete, edit, or
              delete the task when ever you feel like it! And guess what, all
              your info gets saved automatically so you won't have to worry
              about losing any information!
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
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              className="w-full rounded-lg"
              src={Org}
              alt="office content 1"
              width={600}
            />
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

  let userData = {}
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
