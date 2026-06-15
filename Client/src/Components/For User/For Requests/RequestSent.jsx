import { useEffect } from "react";
import requestStore from "../../../Store/requestStore.js";
import userAuthStore from "../../../Store/userStore.js";

const RequestSent = () => {
  const sentRequestfunc = requestStore((state) => state.getSentRequest);
  const sentRequest = requestStore((state) => state.sentRequest);
  const cancelRequest = requestStore((state) => state.cancelRequest);
  const onlineUsers = userAuthStore((state) => state.onlineUsers);

  useEffect(() => {
    sentRequestfunc();
  }, [sentRequestfunc]);

  return (
    <section id="RequestSent" className="px-4 py-2">
      <h1 className="font-bold text-2xl mb-8">Requests Sent</h1>
      {sentRequest.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-base-content/60">
          <p className="text-lg font-semibold">No pending sent requests</p>
          <p className="text-sm">You haven't sent any friend requests yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sentRequest.map((request) => {
            const receiver = request.receiver || {};
            const isOnline = onlineUsers.includes(receiver._id);

            return (
              <div
                key={request._id}
                className="card card-body size-36 flex items-center justify-center bg-base-300 hover:scale-105 hover:shadow-lg cursor-pointer transition-all duration-300 gap-4"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={!receiver.profilePic ? "/Image/default.png" : receiver.profilePic}
                    alt="pfp"
                    className="size-12 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-sm truncate max-w-[80px]">
                      {receiver.username || "Unknown"}
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
                <button
                  type="button"
                  className="btn btn-error btn-sm w-full"
                  onClick={() => cancelRequest(request._id, receiver._id)}
                >
                  Cancel
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RequestSent;
