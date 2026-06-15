import React from 'react'
import UsersList from './UsersList'
import ChatArea from './ChatArea'

const Chat = () => {
  return (
    <div className='text-base-content h-full w-full flex gap-2'>
        <div className='w-[20%] bg-base-200 p-2'>
            <UsersList />
        </div>
        <div className='w-[90%] bg-base-200'>
            <ChatArea />
        </div>
    </div>
  )
}

export default Chat