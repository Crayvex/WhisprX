import axiosInstance from "../Libs/axiosInstance";
import { create } from "zustand";
import { toast } from "react-toastify";

const requestStore = create((set, get) => ({
  sentRequest: [],
  receivedRequest: [],
  friends: [],
  searchResults: [],
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  
  getSentRequest: async () => {
      try {
        const res = await axiosInstance.get(
          `/friends/sent`,
        );
        const list = Array.isArray(res.data.requests) ? res.data.requests : [];
        set({ sentRequest: list });
      } catch (err) {
        console.log(err);
      }    
  },
  getReceivedRequest: async () => {
    try {
      const res = await axiosInstance.get(
        `/friends/incoming`,
      );
      const list = Array.isArray(res.data.requests) ? res.data.requests : [];
      set({ receivedRequest: list });
    } catch (err) {
      console.log(err);
    }
  },
  getFriends: async () => {
    try {
      const res = await axiosInstance.get(`/friends/friends`);
      const list = Array.isArray(res.data.friends) ? res.data.friends : [];
      set({ friends: list });
    } catch (err) {
      console.log(err);
    }
  },
  searchUsers: async (query) => {
    if (!query || query.trim() === "") {
      set({ searchResults: [] });
      return;
    }
    try {
      const res = await axiosInstance.get(`/auth/search?query=${query}`);
      const list = Array.isArray(res.data.users) ? res.data.users : [];
      set({ searchResults: list });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Could not search users");
    }
  },
  sendRequest: async (receiverId) => {
    try {
      await axiosInstance.post(`/friends/send-req/${receiverId}`);
      toast.success("Request Sent Successfully");
      get().getSentRequest();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could NOT Send Request!!");
      console.log(err);
    }
  },
  cancelRequest: async (requestId, receiverId) => {
    try {
      const res = await axiosInstance.delete(`/friends/cancel-req/${receiverId}`);
      if (res.data?.success) {
        toast.success("Request Cancelled Successfully");
        const { sentRequest } = get();
        set({
          sentRequest: sentRequest.filter((req) => req.id !== requestId),
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Could not cancel request");
    }
  },
  acceptRequest: async (requestId, senderId) => {
    try {
      const res = await axiosInstance.patch(`/friends/accept-req/${senderId}`);
      if (res.data?.success) {
        toast.success("Request Accepted");
        const { receivedRequest } = get();
        set({
          receivedRequest: receivedRequest.filter((req) => req.id !== requestId),
        });
        get().getFriends();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Could not accept request");
    }
  },
  rejectRequest: async (requestId, senderId) => {
    try {
      const res = await axiosInstance.patch(`/friends/reject-req/${senderId}`);
      if (res.data?.success) {
        toast.success("Request Rejected");
        const { receivedRequest } = get();
        set({
          receivedRequest: receivedRequest.filter((req) => req.id !== requestId),
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Could not reject request");
    }
  },
}));

export default requestStore;
