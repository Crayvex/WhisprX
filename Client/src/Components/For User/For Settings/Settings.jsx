import { Info, Lock, Palette, SettingsIcon, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Settings = () => {
  
    const [state, setState] = useState("notClicked")
    const navigate = useNavigate()

    useEffect(() => {
      navigate("/app/settings")
    }, [])

  return (
    <section id="Settings" className="h-full flex w-full gap-2 overflow-hidden">
      <div className='w-[20%] overflow-y-auto bg-neutral/85 p-2 rounded-l-2xl text-neutral-content px-4 py-2 '>
        <h1 className='text-2xl font-bold'>Settings</h1>
        <div className="links flex flex-col gap-2 mt-6">
          <NavLink
            to="/app/settings/account"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? ' bg-accent text-accent-content font-semibold flex items-center gap-2' : 'text-neutral-content hover:bg-accent/30'} flex items-center gap-2`
            }
            onClick={() => setState("Clicked")}
          >
            <User />
            Account
          </NavLink>
          <NavLink
            to="/app/settings/preferences"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? ' bg-accent text-accent-content font-semibold flex items-center gap-2' : 'text-neutral-content hover:bg-accent/30'} flex items-center gap-2`
            }
            onClick={() => setState("Clicked")}
          >
            <Palette />
            Preferences
          </NavLink>
          <NavLink
            to="/app/settings/privacy"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? ' bg-accent text-accent-content font-semibold flex items-center gap-2' : 'text-neutral-content hover:bg-accent/30'} flex items-center gap-2`
            }
            onClick={() => setState("Clicked")}
          >
            <Lock />
            Privacy
          </NavLink>
          <NavLink
            to="/app/settings/about"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? ' bg-accent text-accent-content font-semibold flex items-center gap-2' : 'text-neutral-content hover:bg-accent/30'} flex items-center gap-2`
            }
            onClick={() => setState("Clicked")}
          >
            <Info />
            About
          </NavLink>
        </div>
      </div>
      <div className='w-[80%] bg-primary/60 rounded-r-2xl overflow-y-auto'>
        {state === "notClicked" ? (
          <div className='h-full w-full flex flex-col items-center justify-center overflow-hidden'>
            <h1 className='font-bold text-4xl flex items-center gap-4'><SettingsIcon className="size-8 animate-spin" style={{ animationDuration: '3s' }}/> Settings</h1>
            <p className="text-sm text-base-content/65">Customize Your WhisprX Experience</p>
          </div>
        ) : <Outlet />}
      </div>
    </section>
  )
}

export default Settings
