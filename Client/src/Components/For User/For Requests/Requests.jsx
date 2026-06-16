import { Users } from "lucide-react"
import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"

const Requests = () => {
  const [state, setState] = useState("notClicked")
  return (
    <section id='Requests' className="h-full w-full flex gap-2 overflow-hidden">
      <div className="w-[20%] bg-neutral/85 p-2 rounded-l-2xl text-neutral-content px-4 py-2">
        <h1 className="text-2xl font-bold">Requests</h1>
        <div className="mt-6">
          <NavLink
            to="/app/requests/sent"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? 'bg-accent text-accent-content font-semibold flex items-center gap-2' : 'text-neutral-content bg-neutral/65 hover:bg-accent/30'} flex items-center gap-2 my-2 `
            }
            onClick={() => setState("Clicked")}
          >
            Sent
          </NavLink>
          <NavLink
            to="/app/requests/received"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? 'bg-accent text-accent-content font-semibold flex items-center gap-2' : 'text-neutral-content bg-neutral/65 hover:bg-accent/30'} flex items-center gap-2 my-2`
            }
            onClick={() => setState("Clicked")}
          >
            Received
          </NavLink>
          <NavLink
            to="/app/requests/send-request"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? 'bg-accent text-accent-content font-semibold flex items-center gap-2' : 'text-neutral-content bg-neutral/65 hover:bg-accent/30'}  flex items-center gap-2 my-2`
            }
            onClick={() => setState("Clicked")}
          >
            Add Friend
          </NavLink>
        </div>
      </div>
      <div className="w-[80%] h-full bg-primary/60 rounded-r-2xl text-base-content">
        {state === "notClicked" ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="font-bold text-4xl mb-2 flex gap-4 items-center"><Users className="size-8"/> Requests</h1>
            <p className="text-sm">View Your Requests or Send a Request</p>
          </div>
        ) : ""}
        <Outlet/>
      </div>
    </section>
  )
}

export default Requests