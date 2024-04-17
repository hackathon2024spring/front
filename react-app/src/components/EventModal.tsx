import { FC, useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

const EventModal: FC = () => {
  const { daySelected, setShowEventModal, dispatchCalEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    // クリック時に送信するというdefaultの動作をキャンセルする
    e.preventDefault();

    // `daySelected` が `null` でないことを確認
    if (!daySelected) {
      console.error("daySelected is null");
      return; // `daySelected` が `null` の場合は早期リターン
    }

    const calendarEvent = {
      title: title,
      day: daySelected.valueOf(),
      id: Date.now(),
    };
    dispatchCalEvent({ type: "push", payload: calendarEvent });
    setShowEventModal(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-end">
          <div className="text-gray-400">
            <button onClick={() => setShowEventModal(false)}>
              <MdClose />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div> </div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p>
              {daySelected
                ? daySelected.format("dddd, MMMM DD")
                : "No date selected"}
            </p>
          </div>
        </div>

        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
