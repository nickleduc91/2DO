import Header from "../components/header";

const About = () => {
  return (
    <div>
      <Header />
      <section>
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="tracking-wide">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-cyan-500">
              Why TwoDue?
            </h2>
            <p className="mb-4 text-2xl text-gray-700">
              This website was created as a little side project during my hunt
              for a co-op placement within my third year of university. I ended
              up being really hooked on to this idea and ended up creating a
              full website out of it. I hope you guys enjoy and find this
              useful!
            </p>
            <p className="mb-4 text-2xl text-gray-700">
              As a user, you can create different boards which relate to
              different tasks in your every day life such as for school. And
              then within these boards, you can create different tasks that
              relate to that subject. You can then move, complete, edit, or
              delete the task when ever you feel like it!
            </p>
            <p className="text-2xl text-gray-700">
              If you have any tips or ideas to improve on this project, don't
              hesistate to contact me via email at{" "}
              <span className="text-cyan-500">nickleduc@cmail.carleton.ca</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
