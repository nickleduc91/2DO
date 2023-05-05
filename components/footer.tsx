const Footer = () => {
  return (
    <div className="sticky top-[100vh] pb-6 pl-6">
      <a
        href="https://nickleduc.vercel.app/"
        target="_blank"
        className="items-center text-md text-gray-400 sm:mt-0"
      >
        Made by{" "}
        <span className="text-cyan-400 hover:text-cyan-700">
          {" "}
          Nicholas Leduc <span className="ri-links-line"></span>
        </span>
      </a>
    </div>
  );
};

export default Footer;
