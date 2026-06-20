import { useEffect } from "react";
import requestStore from "../../../Store/requestStore";
import userAuthStore from "../../../Store/userStore";
import { Check, X } from "lucide-react";

const RequestReceived = () => {
  const receivedRequestfunc = requestStore((state) => state.getReceivedRequest);
  const receivedRequest = requestStore((state) => state.receivedRequest);
  const acceptRequest = requestStore((state) => state.acceptRequest);
  const rejectRequest = requestStore((state) => state.rejectRequest);
  const onlineUsers = userAuthStore((state) => state.onlineUsers);

  useEffect(() => {
    receivedRequestfunc();
  }, [receivedRequestfunc]);

  return (
    <section id="RequestReceived" className="px-4 py-2">
      <h1 className="font-bold text-2xl mb-8">Requests Received</h1>
      {receivedRequest.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-base-content/60">
          <p className="text-lg font-semibold">No pending incoming requests</p>
          <p className="text-sm">You're all caught up!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {receivedRequest.map((request) => {
            const sender = request.sender || {};
            const isOnline = onlineUsers.includes(sender.id);

            return (
              <div
                key={request.id}
                className="min-h-8 w-full px-8 py-2 rounded-2xl flex items-center justify-between bg-neutral/80 text-neutral-content hover:scale-101 hover:shadow-lg cursor-pointer transition-all duration-300 gap-4"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={!sender.profilePic ? "/Image/default.png" : sender.profilePic}
                    alt="pfp"
                    className="size-12 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-sm truncate max-w-[80px]">
                      {sender.username || "Unknown"}
                    </h2>
                    <p className="flex items-center gap-1 text-xs text-neutral-content/60">
                      <span
                        className={`size-2 rounded-full ${
                          isOnline ? "bg-emerald-600 animate-pulse" : "bg-base-content/30"
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
                    onClick={() => acceptRequest(request.id, sender.id)}
                  >
                    <Check className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-error btn-sm w-[50%]"
                    onClick={() => rejectRequest(request.id, sender.id)}
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RequestReceived;
