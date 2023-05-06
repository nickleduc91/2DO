import Image from "next/image";
import Logo from "../public/list.png";

const GettingStarted = ({ isSession }: any) => {
  return (
    <div className="md:px-6 py-12 md:px-12 text-center lg:text-left">
      <div className="container mx-auto xl:px-32">
        <div className="md:ml-24 md:grid md:grid-cols-2 md:gap-24 flex items-center">
          <div className="mt-12 lg:mt-0">
            <h1 className="text-black dark:text-white text-5xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">
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
          <div className="mb-12 lg:mb-0 mt-10">
            <Image className="pb-3" src={Logo} alt="" width={325}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
