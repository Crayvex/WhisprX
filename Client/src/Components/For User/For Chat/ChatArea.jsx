import messageStore from "../../../Store/messageStore";
import userAuthStore from "../../../Store/userStore";
import {
  Check,
  EllipsisVertical,
  Image,
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
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingMsg, setEditingMsg] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState("left");
  const [dropdownVertical, setDropdownVertical] = useState("bottom");

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

  // Close open menu when clicking outside
  useEffect(() => {
    function handleDocClick(e) {
      if (!openMenuId) return;
      const menuEl = menuRef.current;
      const ddEl = dropdownRef.current;
      if (menuEl && menuEl.contains(e.target)) return;
      if (ddEl && ddEl.contains(e.target)) return;
      setOpenMenuId(null);
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, [openMenuId]);

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

  const handleEdit = (message) => {
    setEditingMsg(message);
    setText(message.text || "");
    setOpenMenuId(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const cancelEdit = () => {
    setEditingMsg(null);
    setText("");
  };

  const handleDelete = (message) => {
    setSelectedMsg(message);
    setShowDeleteConfirm(true);
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    await deleteMsg();
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setSelectedMsg(null);
    setShowDeleteConfirm(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmedText = text.trim();

    // Edit mode
    if (editingMsg) {
      if (!trimmedText) return;
      setSelectedMsg(editingMsg);
      await updateMsg({ text: trimmedText });
      setEditingMsg(null);
      setText("");
      return;
    }

    // Normal send
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
          <div className="chat relative h-[92%] overflow-y-auto pt-1 flex flex-col">
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
                        <div className={`${isHovered ? "inline-block" : "hidden"} w-46 relative cursor-pointer right-0 bottom-0`}>
                          <div
                            ref={openMenuId === messageId ? menuRef : null}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (openMenuId === messageId) {
                                setOpenMenuId(null);
                              } else {
                                setOpenMenuId(messageId);
                                // compute position when opening
                                setTimeout(() => {
                                  try {
                                    const rect = menuRef.current?.getBoundingClientRect();
                                    const ddWidth = dropdownRef.current?.offsetWidth || 180;
                                    const ddHeight = dropdownRef.current?.offsetHeight || 140;
                                    const chatRect = document.getElementById("ChatArea")?.getBoundingClientRect();
                                    if (rect && chatRect) {
                                      if (rect.left + ddWidth > chatRect.right - 8) {
                                        setDropdownPosition("right");
                                      } else if (rect.right - ddWidth < chatRect.left + 8) {
                                        setDropdownPosition("left");
                                      } else {
                                        setDropdownPosition("left");
                                      }

                                      const fitsBelow = rect.bottom + ddHeight <= chatRect.bottom - 8;
                                      const fitsAbove = rect.top - ddHeight >= chatRect.top + 8;
                                      if (fitsBelow) setDropdownVertical("bottom");
                                      else if (fitsAbove) setDropdownVertical("top");
                                      else setDropdownVertical("bottom");
                                    } else if (rect) {
                                      if (rect.left + ddWidth > window.innerWidth - 8) setDropdownPosition("right");
                                      setDropdownVertical("bottom");
                                    }
                                  } catch (e) {
                                    /* ignore */
                                  }
                                }, 0);
                              }
                            }}
                            className="group hover:bg-accent/20 relative right-0 bottom-0 rounded-full size-10 cursor-pointer transition-all duration-300 outline-0 flex items-center p-2"
                          >
                            <EllipsisVertical className="size-6" />
                            <div
                              ref={openMenuId === messageId ? dropdownRef : null}
                              className={`${openMenuId === messageId ? "block" : "hidden"} absolute ${dropdownPosition === "left" ? "left-0" : "right-0"} ${dropdownVertical === "bottom" ? "top-full mt-2" : "bottom-full mb-2"} z-20 bg-neutral text-neutral-content w-46 p-2`}
                            >
                              <time className="opacity-45 text-sm ">
                                {msgTimeFormat(message.createdAt)}{" "}
                              </time>
                              <div className="border border-b border-base-200 my-2"></div>
                              {message.text && (
                                <button
                                  className="flex items-center justify-between gap-2 px-4 py-1 hover:bg-accent/40 rounded w-full cursor-pointer transition-all duration-300"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(message);
                                  }}
                                >
                                  Edit
                                  <Pencil className="size-5"/> 
                                </button>
                              )}
                              <button
                                className="flex items-center justify-between gap-2 px-4 py-1 hover:bg-accent/40 rounded w-full cursor-pointer transition-all duration-300 text-error"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(message);
                                }}
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

            {/* Delete confirmation modal */}
            {showDeleteConfirm && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-base-300 rounded-2xl p-6 shadow-xl max-w-sm w-[85%] flex flex-col items-center gap-4">
                  <Trash className="size-8 text-error" />
                  <p className="text-lg font-semibold text-center">Delete this message?</p>
                  <p className="text-sm text-base-content/60 text-center">This action cannot be undone.</p>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={cancelDelete}
                      className="flex-1 py-2 rounded-xl bg-base-200 hover:bg-base-100 transition-all cursor-pointer font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 py-2 rounded-xl bg-error text-error-content hover:bg-error/80 transition-all cursor-pointer font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit mode banner */}
            {editingMsg && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-accent/90 text-accent-content px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg z-10 backdrop-blur-sm">
                <Pencil className="size-4 shrink-0" />
                <span className="text-sm font-medium truncate max-w-48">Editing message</span>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="hover:bg-accent-focus rounded-full p-1 cursor-pointer transition-all"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}

            {/* Input bar */}
            <form onSubmit={handleSend} className="absolute bottom-2 w-full">
              <div className={`w-[90%] mx-auto ${editingMsg ? 'bg-accent/90 ring-2 ring-accent' : 'bg-accent/70'} text-accent-content h-12 rounded-2xl flex items-center px-4 gap-2 transition-all`}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={editingMsg ? "Edit your message..." : "Send a message...."}
                  className="outline-0 border-0 w-full bg-transparent"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                {editingMsg ? (
                  <>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="hover:bg-accent transition-all size-8 rounded-full p-1 flex items-center justify-center cursor-pointer shrink-0"
                    >
                      <X className="size-5" />
                    </button>
                    <button
                      type="submit"
                      disabled={!text.trim()}
                      className="hover:bg-accent transition-all size-8 rounded-full p-1 flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Check className="size-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="hover:bg-accent transition-all size-8 rounded-full p-1 flex items-center justify-center cursor-pointer shrink-0"
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
                      className="hover:bg-accent transition-all size-8 rounded-full p-1 flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send className="size-5" />
                    </button>
                  </>
                )}
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
