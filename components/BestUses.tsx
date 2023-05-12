import ImageCarousel from "./Cards/ImageCarousel";

const icons = [
  {
    icon: "ri-pencil-line ri-4x",
    name: "School",
  },
  {
    icon: "ri-briefcase-line ri-4x",
    name: "Work",
  },
  {
    icon: "ri-home-smile-2-line ri-4x",
    name: "Chores",
  },
  {
    icon: "ri-shopping-bag-line ri-4x",
    name: "Groceries",
  },
  {
    icon: "ri-file-line ri-4x",
    name: "Projects",
  },
  {
    icon: "ri-calendar-event-line ri-4x",
    name: "Scheduling",
  },
  {
    icon: "ri-file-paper-2-line ri-4x",
    name: "Planning",
  },
  {
    icon: "ri-instagram-line ri-4x",
    name: "Social Media",
  },
];

const BestUses = () => {
  return (
    <div className="pt-24 text-gray-400 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="mb-10 md:mx-auto sm:text-center md:mb-12">
        <h2 className="max-w-lg mb-6 text-3xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="fill-cyan-500 absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Productive</span>
          </span>{" "}
          uses for <span className="text-cyan-500">TwoDue</span>
        </h2>
        <ImageCarousel icons={icons} />
      </div>
    </div>
  );
};

export default BestUses;
