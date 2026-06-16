import React from 'react'
import UsersList from './UsersList'
import ChatArea from './ChatArea'

const Chat = () => {
  return (
    <div className='text-base-content h-full w-full flex gap-2'>
        <div className='w-[26%] bg-neutral/85 p-2 rounded-l-2xl'>
            <UsersList />
        </div>
        <div className='w-[80%] bg-primary/25 rounded-r-2xl'>
            <ChatArea />
        </div>
    </div>
  )
}

export default Chat