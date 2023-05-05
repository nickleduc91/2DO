import Image from "next/image";
import Header from "../components/header";
import Logo from "../public/list.png";
import Footer from "../components/footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Home = ({ isSession }) => {
  return (
    <div className="bg-black min-h-screen">
      <section className="text-white md:pb-24">
        <Header isSession={isSession} />
        <div className="md:px-6 py-12 md:px-12 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="md:ml-24 md:grid md:grid-cols-2 md:gap-24 flex items-center">
              <div className="mt-12 lg:mt-0">
                <h1 className="text-5xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">
                  The best tool for <br />
                  <span className="text-cyan-500">organizing tasks.</span>
                </h1>

                <a
                  className="inline-block px-7 py-3 mr-2 bg-cyan-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-cyan-800 hover:shadow-lg focus:bg-cyan-800 focus:shadow-lg focus:outline-none focus:ring-0 active:cyan-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  href={isSession ? "/boards" : "/register"}
                  role="button"
                >
                  {isSession ? "Resume" : "Get Started"}
                </a>

                <a
                  className="inline-block px-7 py-3 bg-transparent text-cyan-500 font-medium text-sm leading-snug uppercase rounded hover:text-cyan-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  href="/about"
                  role="button"
                >
                  Learn more
                </a>
              </div>
              <div className="mb-12 lg:mb-0 mt-12">
                <Image src={Logo} alt="" width={400} heigh={400} />
              </div>
            </div>
          </div>
        </div>
      </section>
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
