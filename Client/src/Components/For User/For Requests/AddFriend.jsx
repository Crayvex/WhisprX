import { Search } from "lucide-react";
import { useState } from "react";

const AddFriend = () => {
  const [friendId, setFriendId] = useState("");

  return (
    <section id="AddFriend" className="py-2 px-4">
      <div className="w-full bg-base-300 flex h-10 rounded-2xl px-4 items-center gap-2">
        <input
          type="text"
          onChange={(e) => setFriendId(e.target.value)}
          value={friendId}
          placeholder="Search A User"
          className="outline-0 border-0 w-full"
        />
        <Search />
      </div>
      <div className="grid grid-cols-5 mt-10">
        <div className="card card-body size-36 flex items-center justify-center bg-base-300 cursor-pointer transition-all duration-300 gap-4 ">
          <div className="flex items-center gap-2">
            <img
              src="/Image/default.png"
              alt="pfp"
              className="size-12 rounded-full"
            />
            <div>
              <h2>User1</h2>
              <p className="flex items-center gap-1 text-xs text-base-content/60">
                <span className="animate-pulse size-2 bg-emerald-600 rounded-full" />{" "}
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="btn btn-success btn-sm ">
              Send Request
            </button>
          </div>
        </div>
        <div className="card card-body size-36 flex items-center justify-center bg-base-300 cursor-pointer transition-all duration-300 gap-4 ">
          <div className="flex items-center gap-2">
            <img
              src="/Image/default.png"
              alt="pfp"
              className="size-12 rounded-full"
            />
            <div>
              <h2>User1</h2>
              <p className="flex items-center gap-1 text-xs text-base-content/60">
                <span className="animate-pulse size-2 bg-emerald-600 rounded-full" />{" "}
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="btn btn-success btn-sm ">
              Send Request
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddFriend;
