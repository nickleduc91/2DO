const Footer = () => {
  return (
    <footer className="p-4 md:flex md:items-center md:justify-between md:p-6">
      <div className="text-lg items-center mt-3 text-md text-white sm:mt-0">
        Made by{" "}
        <a
          className="text-cyan-500 hover:text-cyan-700"
          href={"https://nickleduc91.github.io/"}
          target={"_blank"}
        >
          {" "}
          Nicholas Leduc
        </a>
      </div>
    </footer>
  );
};

export default Footer;
