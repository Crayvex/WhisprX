import { Search } from 'lucide-react'
import React from 'react'

const UsersList = () => {
  return (
    <section id='UserList' className='mt-4'>
        <div className='bg-base-300 rounded-2xl w-full h-8 flex items-center px-2'>
            <input type="text" className='text-sm outline-0 border-0' placeholder='Search User'/>
            <Search className='text-base-content/40' />
        </div>
        <div className='mt-10'>
            <div className="users flex gap-2 my-2 bg-base-100 hover:bg-base-300 cursor-pointer transition-all duration-300 px-2 py-1 rounded-2xl">
                <img src="/Image/default.png" alt="pfp" className='size-10 rounded-full'/>
                <div>
                    <h1>User1</h1>
                    <span className='text-sm flex gap-1 items-center'><span className='animate-pulse bg-success size-2 rounded-full' />Online </span>
                </div>
            </div>
        </div>

    </section>
  )
}

export default UsersList