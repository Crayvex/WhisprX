import axiosInstance from "../Libs/axiosInstance";
import { create } from "zustand";
import { toast } from "react-toastify";

const messageStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  isSending: false,

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getChat: async (receiverId) => {
    if (!receiverId) return;
    try {
      const res = await axiosInstance.get(`/messages/get-chat/${receiverId}`);
      const list = Array.isArray(res.data.messages) ? res.data.messages : [];
      set({ messages: list });
    } catch (err) {
      console.log(err);
      set({ messages: [] });
    }
  },

  appendIncomingMessage: (message) => {
    const { selectedUser, messages } = get();
    const isCurrentChat = selectedUser?.id === message.senderId?.toString();
    if (isCurrentChat) {
      set({ messages: [...messages, message] });
    }
  },

  sendMessage: async ({ text, img }) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    const receiverId = selectedUser.id;
    if (!receiverId) return;

    set({ isSending: true });
    try {
      const res = await axiosInstance.post(`/messages/send-msg/${receiverId}`, {
        text,
        img,
      });
      if (res.data?.success) {
        set({ messages: [...messages, res.data.data] });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Could not send message");
    } finally {
      set({ isSending: false });
    }
  },
}));

export default messageStore;
