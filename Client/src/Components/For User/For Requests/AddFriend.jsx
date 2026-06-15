import { Search, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import requestStore from "../../../Store/requestStore.js";
import userAuthStore from "../../../Store/userStore.js";

const AddFriend = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchUsers = requestStore((state) => state.searchUsers);
  const searchResults = requestStore((state) => state.searchResults);
  const sentRequest = requestStore((state) => state.sentRequest);
  const receivedRequest = requestStore((state) => state.receivedRequest);
  const friends = requestStore((state) => state.friends);

  const getSentRequest = requestStore((state) => state.getSentRequest);
  const getReceivedRequest = requestStore((state) => state.getReceivedRequest);
  const getFriends = requestStore((state) => state.getFriends);

  const sendRequest = requestStore((state) => state.sendRequest);
  const cancelRequest = requestStore((state) => state.cancelRequest);
  const acceptRequest = requestStore((state) => state.acceptRequest);
  const rejectRequest = requestStore((state) => state.rejectRequest);

  const onlineUsers = userAuthStore((state) => state.onlineUsers);

  useEffect(() => {
    getSentRequest();
    getReceivedRequest();
    getFriends();
  }, [getSentRequest, getReceivedRequest, getFriends]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchUsers(query);
  };

  const getRelationship = (user) => {
    const userId = user.id || user._id;

    const isFriend = friends.some((f) => (f.id || f._id) === userId);
    if (isFriend) return { type: "friend" };

    const pendingSent = sentRequest.find(
      (req) => (req.receiver?.id || req.receiver?._id) === userId
    );
    if (pendingSent) return { type: "sent", reqId: pendingSent._id };

    const pendingReceived = receivedRequest.find(
      (req) => (req.sender?.id || req.sender?._id) === userId
    );
    if (pendingReceived) return { type: "received", reqId: pendingReceived._id };

    return { type: "stranger" };
  };

  return (
    <section id="AddFriend" className="py-2 px-4">
      <div className="w-full bg-base-300 flex h-10 rounded-2xl px-4 items-center gap-2">
        <input
          type="text"
          onChange={handleSearchChange}
          value={searchQuery}
          placeholder="Search A User by Username or Email"
          className="outline-0 border-0 w-full"
        />
        <Search className="text-base-content/40" />
      </div>

      {searchQuery.trim() === "" ? (
        <div className="flex flex-col items-center justify-center py-20 text-base-content/50">
          <Search className="size-12 mb-2 stroke-1" />
          <p className="text-lg font-semibold">Search for users</p>
          <p className="text-sm">Find users by entering their username or email.</p>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-base-content/50">
          <p className="text-lg font-semibold">No users found</p>
          <p className="text-sm">Try searching with a different name or email.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
          {searchResults.map((user) => {
            const userId = user.id || user._id;
            const isOnline = onlineUsers.includes(userId);
            const relationship = getRelationship(user);

            return (
              <div
                key={userId}
                className="card card-body size-36 flex items-center justify-center bg-base-300 hover:scale-103 hover:shadow-lg cursor-pointer transition-all duration-300 gap-4"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={!user.profilePic ? "/Image/default.png" : user.profilePic}
                    alt="pfp"
                    className="size-12 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-sm truncate max-w-[80px]">
                      {user.username}
                    </h2>
                    <p className="flex items-center gap-1 text-xs text-base-content/60">
                      <span
                        className={`size-2 rounded-full ${
                          isOnline ? "bg-emerald-600 animate-pulse" : "bg-base-content/30"
                        }`}
                      />{" "}
                      {isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full justify-center">
                  {relationship.type === "friend" && (
                    <span className="badge badge-success badge-sm font-semibold p-2.5">
                      Friends
                    </span>
                  )}

                  {relationship.type === "sent" && (
                    <button
                      type="button"
                      className="btn btn-error btn-xs w-full text-[10px]"
                      onClick={() => cancelRequest(relationship.reqId, userId)}
                    >
                      Cancel
                    </button>
                  )}

                  {relationship.type === "received" && (
                    <div className="flex items-center gap-1.5 w-full">
                      <button
                        type="button"
                        className="btn btn-success btn-xs w-[50%]"
                        onClick={() => acceptRequest(relationship.reqId, userId)}
                      >
                        <Check className="size-3" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-error btn-xs w-[50%]"
                        onClick={() => rejectRequest(relationship.reqId, userId)}
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  )}

                  {relationship.type === "stranger" && (
                    <button
                      type="button"
                      className="btn btn-success btn-sm text-xs py-1 h-auto min-h-0 w-full"
                      onClick={() => sendRequest(userId)}
                    >
                      Send Request
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AddFriend;
