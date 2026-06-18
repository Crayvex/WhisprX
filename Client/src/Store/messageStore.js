import axiosInstance from "../Libs/axiosInstance";
import { create } from "zustand";
import { toast } from "react-toastify";

const messageStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  selectedMsg: null,
  isSending: false,
  isChatLoading: false,

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  setSelectedMsg: (selectedMsg) => set({ selectedMsg }),

  getChat: async (receiverId) => {
    if (!receiverId) return;
    try {
      set({ isChatLoading: true})
      const res = await axiosInstance.get(`/messages/get-chat/${receiverId}`);
      const list = Array.isArray(res.data.messages) ? res.data.messages : [];
      set({ messages: list });
    } catch (err) {
      console.log(err);
      set({ messages: [] });
      set({ isChatLoading: false})
    } finally {
      set({ isChatLoading: false})
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

  updateMsg: async ({ text }) => {
    const { selectedMsg, messages } = get();
    if (!selectedMsg?.id) return;
    try {
      const res = await axiosInstance.patch(`/messages/update-msg/${selectedMsg.id}`, { text });
      set({ messages: messages.map((m) => (m.id === selectedMsg.id ? { ...m, text } : m)) });
    } catch (e) {
      toast.error("Could NOT update message");
    }
  },

  deleteMsg: async () => {
    const { selectedMsg, messages } = get();
    if (!selectedMsg?.id) return;
    try {
      const res = await axiosInstance.delete(`/messages/delete-msg/${selectedMsg.id}`);
      set({ messages: messages.filter((m) => m.id !== selectedMsg.id), selectedMsg: null });
    } catch (e) {
      toast.error("Could NOT delete message");
    }
  },

}));

export default messageStore;
