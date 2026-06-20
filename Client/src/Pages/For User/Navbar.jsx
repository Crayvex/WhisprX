import { useNavigate } from "react-router-dom";
import userAuthStore from "../../Store/userStore";
import {
  Info,
  LogOut,
  MessageCircle,
  RefreshCcw,
  Settings,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const profilePic = userAuthStore((state) => state.profilePic);
  const userAuth = userAuthStore((state) => state.userAuth);
  const logout = userAuthStore((state) => state.logout);

  const [state, setState] = useState("hidden");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="Navbar" className="group h-full w-full">
      <div className="relative w-full h-full flex flex-col justify-between">
        <div className="m-2 mt-6 flex justify-around items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={!profilePic ? "/Image/default.png" : profilePic}
              alt=""
              className="size-10 rounded-full"
              rel="preload"
              fetchPriority="high"
              onClick={() => navigate("/app/profile")}
            />
            <h1 className="font-bold hidden group-hover:inline-block text-xl">
              {userAuth.username}
            </h1>
          </div>
          {userAuth.role === "admin" ? (
          <a
            href="/dashboard"
            className="hidden group-hover:inline-block whitespace-nowrap relative hover:text-accent transition-all duration-300 "
            onMouseEnter={() => setState("flex")}
            onMouseLeave={() => setState("hidden")}
          >
            <RefreshCcw />
            <div
              className={`${state} absolute bg-primary/30 top-8 text-sm right-0 px-2 py-1 rounded gap-4 items-center text-base-content`}
            >
              <Info className="size-4" />
              <p>
                Switch to Admin <br /> Dashboard
              </p>
            </div>
          </a>
          ) : (
            <div>
              
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-4 pt-4 my-20 h-full">
          <a
            href="/app/chat"
            className="flex items-center gap-4 hover:bg-base-300/30 w-[80%] px-[10%] py-2 rounded hover:ml-4 transition-all duration-150 overflow-hidden border-b-2"
          >
            <MessageCircle />
            <span className="hidden group-hover:inline-block whitespace-nowrap">
              Messages
            </span>
          </a>
          <a
            href="/app/requests"
            className="flex items-center gap-4 hover:bg-base-300/30  border-b-2 text-neutral-content w-[80%] px-[10%] py-2 rounded hover:ml-4 transition-all duration-150 overflow-hidden"
          >
            <UsersIcon />
            <span className="hidden group-hover:inline-block whitespace-nowrap">
              Friends
            </span>
          </a>
          <a
            href="/app/settings"
            className="flex items-center gap-4 hover:bg-base-300/30  border-b-2 text-neutral-content w-[80%] px-[10%] py-2 rounded hover:ml-4 transition-all duration-150 overflow-hidden"
          >
            <Settings />
            <span className="hidden group-hover:inline-block whitespace-nowrap">
              Settings
            </span>
          </a>
        </div>
        <button
          type="button"
          onClick={() => handleLogout()}
          className="flex items-center gap-4 absolute left-2 bottom-10 border border-white/65 hover:border-red-600 hover:bg-red-600 px-[10%] py-2 cursor-pointer rounded overflow-hidden"
        >
          <LogOut />
          <span className="hidden group-hover:inline-block whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </section>
  );
};

export default Navbar;
