const Footer = () => {
  return (
    <div className="sticky top-[100vh] pb-6 pl-6 font-medium">
      <a
        href="https://nickleduc.vercel.app/"
        target="_blank"
        className="items-center text-lg text-black dark:text-white sm:mt-0"
      >
        Made by{" "}
        <span className="text-cyan-500 hover:text-cyan-700">
          {" "}
          Nicholas Leduc <span className="ri-links-line"></span>
        </span>
      </a>
    </div>
  );
};

export default Footer;
