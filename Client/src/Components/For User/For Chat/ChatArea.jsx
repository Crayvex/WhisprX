import { Image, Send, X } from "lucide-react";
import React, { useRef } from "react";

const ChatArea = () => {
  let fileRef = useRef(null);

  return (
    <section id="ChatArea" className="h-full w-full">
      <div className="nav h-[8%] w-full bg-base-300 flex items-center justify-between px-6">
        <div className="flex items-center gap-4 cursor-pointer">
            <img src="/Image/default.png" alt="pfp" className="size-10 rounded-full"/>
            <div>
                <h1>User1</h1>
                <p className="flex items-center gap-1 text-sm"><span className="size-2 animate-pulse bg-emerald-600 rounded-full"/> Online</p>
            </div>
        </div>
        <div className="hover:bg-base-200 p-2 flex items-center rounded-full cursor-pointer">
            <X />
        </div>
      </div>
      <div className="chat relative h-[92%] overflow-y-auto pt-4">
        <div className="h-full">
            <div className="msgSent flex justify-end px-2">
                {/* bg-linear-60 from-primary to-secondary */}
                <div className="bg-accent rounded-2xl min-w-20 text-accent-content py-2 px-4 max-w-3xl">
                    Helloo hsafjooenfaofoahofhaohweo Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ad tempora delectus laudantium rem tenetur corporis dolore ut, velit, at voluptatum ratione consectetur sint cum reprehenderit dolor architecto iste praesentium!
                </div>
            </div>
            <div className="msgReceived flex justify-start gap-2 px-2">
                <img src="/Image/default.png" alt="pfp" className="rounded-full size-10"/>
                <div className="bg-neutral rounded-2xl min-w-20 text-neutral-content py-2 px-4 max-w-3xl">
                    Heyyy
                </div>
            </div>
        </div>
        <div className="absolute bottom-2 w-full">
          <div className="w-[90%] mx-auto bg-base-300 h-12 rounded-2xl flex items-center px-4">
            <input
              type="text"
              placeholder="Send a message...."
              className="outline-0 border-0 w-full"
            />
            <button className="hover:bg-accent transition-all size-8 rounded-full p-1 flex items-center cursor-pointer">
              <Image />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={fileRef}
              />
            </button>
            <input type="file" />
            <button className="hover:bg-accent transition-all size-8 rounded-full p-1 flex items-center cursor-pointer">
              <Send />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatArea;
