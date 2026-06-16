import messageStore from "../../../Store/messageStore";
import userAuthStore from "../../../Store/userStore";
import {
  ChevronDown,
  EllipsisVertical,
  Image,
  Menu,
  MessageCircle,
  Pencil,
  Send,
  Trash,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { msgTimeFormat } from "../../../Libs/dateFormatter";

const ChatArea = () => {
  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [msgState, setMsgState] = useState("hidden");

  const selectedUser = messageStore((state) => state.selectedUser);
  const setSelectedUser = messageStore((state) => state.setSelectedUser);

  const messages = messageStore((state) => state.messages);
  const selectedMsg = messageStore((state) => state.selectedMsg);
  const setSelectedMsg = messageStore((state) => state.setSelectedMsg);

  const getChat = messageStore((state) => state.getChat);
  const isSending = messageStore((state) => state.isSending);

  const sendMessage = messageStore((state) => state.sendMessage);
  const updateMsg = messageStore((state) => state.updateMsg);
  const deleteMsg = messageStore((state) => state.deleteMsg);

  const userAuth = userAuthStore((state) => state.userAuth);

  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    if (selectedUser?.id) {
      getChat(selectedUser.id);
    }
  }, [selectedUser, getChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImgPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText && !imgPreview) return;

    await sendMessage({
      text: trimmedText || undefined,
      img: imgPreview || undefined,
    });

    setText("");
    setImgPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <section id="ChatArea" className="h-full w-full">
      {selectedUser ? (
        <>
          {/* Nav bar */}
          <div className="nav h-[8%] w-full bg-base-300 flex items-center justify-between px-6">
            <div className="flex items-center gap-4 cursor-pointer">
              <img
                src={
                  !selectedUser.profilePic
                    ? "/Image/default.png"
                    : selectedUser.profilePic
                }
                alt="pfp"
                className="size-10 rounded-full"
              />
              <div>
                <h1>{selectedUser?.username}</h1>
                <p className="flex items-center gap-1 text-sm">
                  <span className="size-2 animate-pulse bg-emerald-600 rounded-full" />{" "}
                  Online
                </p>
              </div>
            </div>
            <div
              onClick={() => setSelectedUser(null)}
              className="hover:bg-base-200 p-2 flex items-center rounded-full cursor-pointer"
            >
              <X />
            </div>
          </div>

          {/* Chat area */}
          <div className="chat relative h-[92%] overflow-y-auto pt-0 flex flex-col">
            <div className="flex-1 overflow-y-auto px-2 pb-20">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-base-content/50">
                  <p className="text-lg font-semibold">No messages yet</p>
                  <p className="text-sm">Send a message to start chatting!</p>
                </div>
              )}

              {messages.map((message) => {
                const isOwn =
                  message.senderId === userAuth?.id ||
                  message.senderId === userAuth?._id;
                const messageId = message.id || message._id;
                const isHovered = hoveredMessageId === messageId;

                return (
                  <div
                    key={messageId}
                    className={`flex gap-2 ${isOwn ? "justify-end" : "justify-start"} px-2`}
                    onMouseEnter={() => setHoveredMessageId(messageId)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                  >
                    {!isOwn && (
                      <img
                        src={
                          selectedUser.profilePic === ""
                            ? "/Image/default.png"
                            : selectedUser.profilePic
                        }
                        alt="pfp"
                        className="size-10 rounded-full"
                      />
                    )}
                    {!isOwn ? (
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className={`${
                            isOwn
                              ? "bg-accent text-accent-content"
                              : "bg-neutral text-neutral-content"
                          } mb-4 rounded-2xl min-w-20 py-2 px-4 max-w-3xl`}
                        >
                          {message.img && (
                            <img
                              src={message.img}
                              alt="attachment"
                              className="max-w-60 rounded-xl mb-2"
                            />
                          )}
                          {message.text && <p>{message.text}</p>}
                        </div>
                        <time className="opacity-45 text-sm">
                          {msgTimeFormat(message.createdAt)}{" "}
                        </time>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <div
                          className={`${isHovered ? "inline-block" : "hidden"} w-46 relative cursor-pointer right-0 bottom-0`}
                          onMouseEnter={() => setMsgState("inline-block")}
                          onMouseLeave={() => setMsgState("hidden")}
                        >
                          <div className="group hover:bg-base-300 relative right-0 bottom-0 rounded-full size-10 cursor-pointer transition-all duration-300 outline-0 flex items-center p-2">
                            <EllipsisVertical className="size-6"/>
                            <div
                              className={`${msgState} absolute left-0 bottom-0 z-20 bg-base-300 w-46 px-2 py-1`}
                            >
                              <time className="opacity-45 text-sm ">
                                {msgTimeFormat(message.createdAt)}{" "}
                              </time>
                              <div className="border border-b border-base-200 my-2"></div>
                              <button
                                className="flex items-center justify-between gap-2 px-4 py-1 hover:bg-accent/70 rounded w-full cursor-pointer transition-all duration-300"
                              >
                                Edit
                                <Pencil className="size-5"/> 
                              </button>
                              <button
                                className="flex items-center justify-between gap-2 px-4 py-1 hover:bg-accent/70 rounded w-full cursor-pointer transition-all duration-300 text-error"
                                onClick={() => setSelectedMsg(messageId)}
                              >
                                Delete
                                <Trash className="size-5"/>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${
                            isOwn
                              ? "bg-accent text-accent-content"
                              : "bg-neutral text-neutral-content"
                          } mb-4 rounded-2xl min-w-20 max-w-3xl relative`}
                        >
                          {message.img && (
                            <img
                              src={message.img}
                              alt="attachment"
                              className="max-w-60 rounded-xl p-2"
                            />
                          )}
                          {message.text && <p className="px-4 py-2">{message.text}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Image preview */}
            {imgPreview && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-base-300 p-1 rounded-xl">
                <div className="relative">
                  <img
                    src={imgPreview}
                    alt="preview"
                    className="max-h-40 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-error text-error-content rounded-full size-6 flex items-center justify-center cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Input bar */}
            <form onSubmit={handleSend} className="absolute bottom-2 w-full">
              <div className="w-[90%] mx-auto bg-accent/20 h-12 rounded-2xl flex items-center px-4 gap-2">
                <input
                  type="text"
                  placeholder="Send a message...."
                  className="outline-0 border-0 w-full bg-transparent"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  type="button"
                  className="hover:bg-accent transition-all size-8 rounded-full p-1 flex items-center justify-center cursor-pointer flex-shrink-0"
                  onClick={() => fileRef.current?.click()}
                >
                  <Image className="size-5" />
                </button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleImageChange}
                />
                <button
                  type="submit"
                  disabled={isSending || (!text.trim() && !imgPreview)}
                  className="hover:bg-accent transition-all size-8 rounded-full p-1 flex items-center justify-center cursor-pointer flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="size-5" />
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex flex-col gap-2 justify-center items-center">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <MessageCircle className="animate-bounce size-8" /> Messages
          </h1>
          <p className="text-base-content/60">
            Select A Chat To Start Chatting
          </p>
        </div>
      )}
    </section>
  );
};

export default ChatArea;
