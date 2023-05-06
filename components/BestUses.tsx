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
      name: "Planning"
  }
];

const BestUses = () => {
  return (
    <div className="text-gray-400">
      <div className="pt-14 text-center">
        <h3 className="text-black dark:text-white text-3xl md:text-3xl xl:text-4xl font-bold tracking-tight mb-2">
          Productive Uses for
          <span className="text-cyan-500"> TwoDue</span>
        </h3>
        <ImageCarousel icons={icons} />
      </div>
    </div>
  );
};

export default BestUses;
