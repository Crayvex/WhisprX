import messageStore from "../../../Store/messageStore";
import requestStore from "../../../Store/requestStore";
import userAuthStore from "../../../Store/userStore";
import { Search } from "lucide-react";
import { useEffect } from "react";
import FriendListSkeleton from "./FriendListSkeleton";

const UsersList = () => {
  const friends = requestStore((state) => state.friends);
  const getFriends = requestStore((state) => state.getFriends);
  const fetchFriends = requestStore((state) => state.fetchFriends);
  const onlineUsers = userAuthStore((state) => state.onlineUsers);

  const setSelectedUser = messageStore((state) => state.setSelectedUser);
  const selectedUser = messageStore((state) => state.selectedUser);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  if (fetchFriends) {
    return (
      <FriendListSkeleton />
    );
  }

  return (
    <section id="UserList" className="mt-4">
      <div className="bg-neutral/90 border border-accent/20 text-neutral-content rounded-2xl w-full h-10 flex items-center px-2">
        <input
          type="text"
          className="text-sm w-full outline-0 border-0"
          placeholder="Search User"
        />
        <Search />
      </div>
      <div className="mt-10">
        {friends.map((friend) => {
          const isActive = selectedUser?.id === friend?.id;
          return (
            <div
              key={friend?.id}
              onClick={() => setSelectedUser(friend)}
              className={`users flex gap-2 my-2 overflow-hidden cursor-pointer transition-all duration-300 px-2 py-1 rounded-2xl ${isActive ? "bg-accent text-accent-content" : "text-neutral-content hover:bg-accent/30"}`}
            >
              <img
                src={
                  !friend.profilePic ? "/Image/default.png" : friend.profilePic
                }
                alt="pfp"
                className="size-10 rounded-full"
              />
              <div>
                <h1>{friend.username}</h1>
                <span className="text-sm flex gap-1 items-center">
                  <span
                    className={`size-2 rounded-full ${onlineUsers.includes(friend.id) ? "bg-success" : "bg-base-300"}`}
                  />
                  {onlineUsers.includes(friend.id) ? "Online" : "Offline"}
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
