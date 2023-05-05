function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BoardCard = ({ board, handleRemoveBoard }: any) => {
  const getCompletedCount = (board: any) => {
    let completed = 0;
    board.tasks.map((task: any) => {
      if (task.completed) {
        completed++;
      }
    });
    return completed;
  };
  return (
    <div className="mx-auto w-full max-w-md py-4 px-4 justify-center items-center animate-wiggle">
      <div className="col-span-2 h-52 flex flex-col justify-between bg-zinc-900 rounded-lg shadow-xl mb-6 py-5 px-4">
        <div className="">
          <div className="flex flex-row relative">
            <h4 className="truncate text-cyan-500 text-3xl font-medium mb-5">
              {board.name}
            </h4>
            <i
              className="ri-delete-bin-2-line ri-xl ml-28 hover:text-cyan-500 absolute top-0 right-0 text-white"
              onClick={() => handleRemoveBoard(board)}
            ></i>
          </div>
          <p className="text-gray-300 text-md">{board.description}</p>
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-800">
            <p
              className={classNames(
                getCompletedCount(board) == board.tasks.length &&
                  board.tasks.length > 0
                  ? "text-cyan-500"
                  : "text-white",
                "text-md font-semibold"
              )}
            >
              {board.tasks.length == 1
                ? board.tasks.length + " Task"
                : board.tasks.length + " Tasks"}
              , {getCompletedCount(board)} Completed
            </p>
            <a
              href={`/boards/${board._id}`}
              type="button"
              className="w-24 ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
            >
              Open
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
