import { Mail, Send, UserCog, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Requests = () => {
  const [state, setState] = useState("notClicked");

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/app/requests");
  }, []);

  return (
    <section id="Requests" className="h-full w-full flex gap-2 overflow-hidden">
      <div className="w-[20%] bg-neutral/85 p-2 rounded-l-2xl text-neutral-content px-4 py-2">
        <h1 className="text-2xl font-bold">Friends</h1>
        <div className="mt-6">
          <NavLink
            to="/app/requests/manage-friends"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? "bg-accent text-accent-content font-semibold flex items-center gap-2" : "text-neutral-content hover:bg-accent/30"}  flex items-center gap-2 my-2`
            }
            onClick={() => setState("Clicked")}
          >
            <UserCog /> Manage Friends
          </NavLink>
          <NavLink
            to="/app/requests/send-request"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? "bg-accent text-accent-content font-semibold flex items-center gap-2" : "text-neutral-content hover:bg-accent/30"}  flex items-center gap-2 my-2`
            }
            onClick={() => setState("Clicked")}
          >
            <UserPlus /> Add Friend
          </NavLink>
          <NavLink
            to="/app/requests/sent"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? "bg-accent text-accent-content font-semibold flex items-center gap-2" : "text-neutral-content hover:bg-accent/30"} flex items-center gap-2 my-2 `
            }
            onClick={() => setState("Clicked")}
          >
            <Send /> Requests Sent
          </NavLink>
          <NavLink
            to="/app/requests/received"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? "bg-accent text-accent-content font-semibold flex items-center gap-2" : "text-neutral-content hover:bg-accent/30"} flex items-center gap-2 my-2`
            }
            onClick={() => setState("Clicked")}
          >
            <Mail /> Requests Received
          </NavLink>
        </div>
      </div>
      <div className="w-[80%] h-full bg-primary/60 rounded-r-2xl text-base-content">
        {state === "notClicked" ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="font-bold text-4xl mb-2 flex gap-4 items-center">
              <Users className="size-8 animate-pulse" /> Friends
            </h1>
            <p className="text-sm text-center text-base-content/50">
              Manage Your Friends. Send And Receive Friend Requests.
            </p>
          </div>
        ) : (
          ""
        )}
        <Outlet />
      </div>
    </section>
  );
};

export default Requests;
