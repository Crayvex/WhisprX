import { useEffect } from "react";
import requestStore from "../../../Store/requestStore";
import userAuthStore from "../../../Store/userStore";
import { Check, MessageCircle, X } from "lucide-react";

const Friends = () => {
  const friends = requestStore((state) => state.friends);
  const onlineUsers = userAuthStore((state) => state.onlineUsers)

  useEffect(() => {
    friends;
  }, []);

  return (
    <section id="Friends" className="w-full h-full">
      <div className="px-4 py-2 w-full h-full">
        <h1 className="font-bold text-2xl mb-8">Manage Friends</h1>

        {friends.map((friend, i) => {
          const isOnline = onlineUsers.includes(friend?.id);
          return (
            <div
              key={friend.id || i}
              className="min-h-8 w-full px-8 py-2 mb-2 rounded-2xl flex items-center justify-between bg-neutral/45 text-neutral-content hover:scale-101 hover:shadow-lg cursor-pointer transition-all duration-300 gap-4"
            >
              <div className="flex items-center gap-2">
                <img
                  src={
                    friend.profilePic === ''
                      ? "/Image/default.png"
                      : friend.profilePic
                  }
                  alt="pfp"
                  className="size-12 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-sm truncate max-w-[80px]">
                    {friend.username || "Unknown"}
                  </h2>
                  <p className="flex items-center gap-1 text-xs text-neutral-content/60">
                    <span
                      className={`size-2 rounded-full ${
                        isOnline
                          ? "bg-emerald-600 animate-pulse"
                          : "bg-base-content/30"
                      }`}
                    />{" "}
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 min-h-8 w-36">
                <button
                  type="button"
                  className="btn btn-success btn-sm w-[50%]"
                >
                  <MessageCircle className="size-4" />
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-sm w-[50%]"
                >
                  Block
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Friends;
