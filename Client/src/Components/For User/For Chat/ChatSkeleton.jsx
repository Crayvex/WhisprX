const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 p-4 animate-pulse">
      {/* Incoming Message */}
      <div className="flex items-start gap-3">
        <div className="skeleton w-12 h-12 rounded-full shrink-0" />

        <div className="flex flex-col gap-2">
          <div className="skeleton h-10 w-28 rounded-3xl" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>

      {/* Outgoing Image Message */}
      <div className="flex justify-end">
        <div className="skeleton w-72 h-72 rounded-3xl" />
      </div>

      {/* Incoming Messages */}
      <div className="flex items-start gap-3">
        <div className="skeleton w-12 h-12 rounded-full shrink-0" />

        <div className="flex flex-col gap-2">
          <div className="skeleton h-10 w-32 rounded-3xl" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="skeleton w-12 h-12 rounded-full shrink-0" />

        <div className="flex flex-col gap-2">
          <div className="skeleton h-10 w-48 rounded-3xl" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>

      {/* Outgoing Messages */}
      <div className="flex justify-end">
        <div className="flex flex-col items-end gap-2">
          <div className="skeleton h-10 w-44 rounded-3xl" />
          <div className="skeleton h-10 w-52 rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;