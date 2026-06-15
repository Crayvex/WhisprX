import { useNavigate } from 'react-router-dom'
import userAuthStore from '../../Store/userStore'
import { LogOut, MessageCircle, Settings, UsersIcon } from 'lucide-react'

const Navbar = () => {

    const profilePic = userAuthStore((state) => state.profilePic)
    const userAuth = userAuthStore((state) => state.userAuth)
    const logout = userAuthStore((state) => state.logout)

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/")
        } catch (err) {
            console.log(err);
            
        }
    }

    return (
    <section id='Navbar' className='group h-full w-full'>
        <div className='relative w-full h-full'>
            <a href='/app/profile' className='m-2 mt-6 flex relative  items-center gap-2'>
                <img src={!profilePic ? "/Image/default.png" : profilePic } alt="" className='size-10 rounded-full'/>
                <p className='hidden group-hover:inline-block'>{userAuth.username}</p>
            </a>
            <div className='flex flex-col items-center gap-4 pt-4 my-20 h-full'>
                <a href="/app/chat" className='flex items-center gap-4 hover:bg-base-300/30 w-[80%] px-[10%] py-2 rounded hover:ml-4 transition-all duration-150 overflow-hidden'>
                    <MessageCircle />
                    <span className='hidden group-hover:inline-block whitespace-nowrap'>Messages</span>
                </a>
                <a href="/app/requests" className='flex items-center gap-4 hover:bg-base-300/30 text-neutral-content w-[80%] px-[10%] py-2 rounded hover:ml-4 transition-all duration-150 overflow-hidden'>
                    <UsersIcon />
                    <span className='hidden group-hover:inline-block whitespace-nowrap'>Requests</span>
                </a>
                <a href="/app/settings" className='flex items-center gap-4 hover:bg-base-300/30 text-neutral-content w-[80%] px-[10%] py-2 rounded hover:ml-4 transition-all duration-150 overflow-hidden'>
                    <Settings />
                    <span className='hidden group-hover:inline-block whitespace-nowrap'>Settings</span>
                </a>
            </div>
            <button type="button" onClick={() => handleLogout()} className='flex items-center gap-4 absolute left-2 bottom-10 border border-white/65 hover:border-red-600 hover:bg-red-600 px-[10%] py-2 cursor-pointer rounded overflow-hidden'>
                <LogOut />
                <span className='hidden group-hover:inline-block whitespace-nowrap'>Logout</span>
            </button>
        </div>
    </section>
  )
}

export default Navbar