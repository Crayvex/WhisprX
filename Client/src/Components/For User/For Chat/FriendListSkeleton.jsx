import { Search } from "lucide-react";

const FriendListSkeleton = ({ count = 5 }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="bg-neutral/90 border border-accent/20 text-neutral-content rounded-2xl w-full h-10 flex items-center px-2">
        <input
          type="text"
          className="text-sm w-full outline-0 border-0"
          placeholder="Search User"
        />
        <Search />
      </div>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-full px-4 py-3 animate-pulse"
        >
          {/* Avatar */}
          <div className="size-10 rounded-full bg-base-300"></div>

          {/* User Info */}
          <div className="flex-1">
            <div className="h-5 w-32 rounded bg-base-300 mb-2"></div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-base-300"></div>
              <div className="h-4 w-16 rounded bg-base-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendListSkeleton;