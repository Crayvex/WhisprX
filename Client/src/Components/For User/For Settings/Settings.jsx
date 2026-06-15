import { Palette } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const Settings = () => {
  
  return (
    <section id="Settings" className="h-full flex w-full gap-2">
      <div className='w-[20%] overflow-y-auto bg-base-200 text-base-content px-4 py-2 '>
        <h1 className='text-2xl'>Settings</h1>
        <div className="links flex flex-col gap-2 mt-4">
          <NavLink
            to="/app/settings/preferences"
            className={ ({ isActive }) =>
              `rounded px-3 py-2 transition-colors duration-200 ${isActive ? 'bg-base-300 text-base-content font-semibold flex items-center gap-2' : 'text-base-content/80 hover:bg-base-300 bg-base-300/50'} flex items-center gap-2`
            }
          >
            <Palette />
            Preferences
          </NavLink>
        </div>
      </div>
      <div className='w-[80%]'>
        <Outlet />
      </div>
    </section>
  )
}

export default Settings
