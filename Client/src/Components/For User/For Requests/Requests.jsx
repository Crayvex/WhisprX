import { Users } from "lucide-react"
import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"

const Requests = () => {
  const [state, setState] = useState("notClicked")
  return (
    <section id='Requests' className="h-full w-full flex gap-2 overflow-hidden">
      <div className="w-[20%] bg-base-200 text-base-content px-4 py-2">
        <h1 className="text-2xl font-bold">Requests</h1>
        <div className="mt-6">
          <NavLink
            to="/app/requests/sent"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? ' bg-accent/20 text-base-content font-semibold flex items-center gap-2' : 'text-base-content/80 hover:bg-accent/20 bg-base-300/50'} flex items-center gap-2 my-2`
            }
            onClick={() => setState("Clicked")}
          >
            Sent
          </NavLink>
          <NavLink
            to="/app/requests/received"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? ' bg-accent/20 text-base-content font-semibold flex items-center gap-2' : 'text-base-content/80 hover:bg-accent/20 bg-base-300/50'} flex items-center gap-2 my-2`
            }
            onClick={() => setState("Clicked")}
          >
            Received
          </NavLink>
          <NavLink
            to="/app/requests/send-request"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? ' bg-accent/20 text-base-content font-semibold flex items-center gap-2' : 'text-base-content/80 hover:bg-accent/20 bg-base-300/50'} flex items-center gap-2 my-2`
            }
            onClick={() => setState("Clicked")}
          >
            Add Friend
          </NavLink>
        </div>
      </div>
      <div className="w-[90%] h-full bg-base-200 text-base-content">
        {state === "notClicked" ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="font-bold text-4xl mb-2 flex gap-4 items-center"><Users className="size-8"/> Requests</h1>
            <p className="text-sm text-base-content/65">View Your Requests or Send a Request</p>
          </div>
        ) : ""}
        <Outlet/>
      </div>
    </section>
  )
}

export default Requests