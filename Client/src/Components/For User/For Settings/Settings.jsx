import { Palette, SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Settings = () => {
  
    const [state, setState] = useState("notClicked")

  return (
    <section id="Settings" className="h-full flex w-full gap-2 overflow-hidden">
      <div className='w-[20%] overflow-y-auto bg-base-200 text-base-content px-4 py-2 '>
        <h1 className='text-2xl font-bold'>Settings</h1>
        <div className="links flex flex-col gap-2 mt-6">
          <NavLink
            to="/app/settings/preferences"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? ' bg-accent/20 text-base-content font-semibold flex items-center gap-2' : 'text-base-content/80 hover:bg-accent/20 bg-base-300/50'} flex items-center gap-2`
            }
            onClick={() => setState("Clicked")}
          >
            <Palette />
            Preferences
          </NavLink>
        </div>
      </div>
      <div className='w-[80%] bg-base-200'>
        {state === "notClicked" ? (
          <div className='h-full w-full flex flex-col items-center justify-center'>
            <h1 className='font-bold text-4xl flex items-center gap-4'><SettingsIcon className="size-8 animate-spin" style={{ animationDuration: '3s' }}/> Settings</h1>
            <p className="text-sm text-base-content/65">Customize Your WhisprX Experience</p>
          </div>
        ) : ""}
        <Outlet />
      </div>
    </section>
  )
}

export default Settings
