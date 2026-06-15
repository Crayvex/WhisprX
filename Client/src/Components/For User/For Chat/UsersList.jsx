import messageStore from "../../../Store/messageStore";
import requestStore from "../../../Store/requestStore";
import { Search } from "lucide-react";
import { useEffect } from "react";

const UsersList = () => {
  const friends = requestStore((state) => state.friends);
  const getFriends = requestStore((state) => state.getFriends);

  const setSelectedUser = messageStore((state) => state.setSelectedUser);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  return (
    <section id="UserList" className="mt-4">
      <div className="bg-base-300 rounded-2xl w-full h-8 flex items-center px-2">
        <input
          type="text"
          className="text-sm outline-0 border-0"
          placeholder="Search User"
        />
        <Search className="text-base-content/40" />
      </div>
      <div className="mt-10">
        {friends.map((friend) => {
          return (
            <div key={friend?.id} onClick={() => setSelectedUser(friend)} className="users flex gap-2 my-2 bg-base-100 hover:bg-base-300 cursor-pointer transition-all duration-300 px-2 py-1 rounded-2xl">
              <img
                src={!friend.profilePic ? "/Image/default.png" : friend.profilePic}
                alt="pfp"
                className="size-10 rounded-full"
              />
              <div>
                <h1>{friend.username}</h1>
                <span className="text-sm flex gap-1 items-center">
                  <span className="animate-pulse bg-success size-2 rounded-full" />
                  Online{" "}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UsersList;
