import axiosInstance from "../Libs/axiosInstance";
import { create } from "zustand";
import { toast } from "react-toastify";

const requestStore = create((set, get) => ({
  sentRequest: [],
  receivedRequest: [],
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  
  getSentRequest: async () => {
      try {
        const res = await axiosInstance.get(
          `/request/sent`,
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
        `/request/incoming`,
      );
      const list = Array.isArray(res.data.requests) ? res.data.requests : [];
      set({ receivedRequest: list });
    } catch (err) {
      console.log(err);
    }
  },
  sendRequest: async () => {
    const { selectedUser } = get();
    if (!selectedUser) {
      toast.error("No user selected!");
      return;
    }
    try {
      await axiosInstance.post(`/request/send-req/${selectedUser._id}`);
      toast.success("Request Sent Successfully");
      set({ selectedUser: null });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could NOT Send Request!!");
      console.log(err);
    }
  },
  cancelRequest: async (requestId, receiverId) => {
    try {
      const res = await axiosInstance.delete(`/request/cancel-req/${receiverId}`);
      if (res.data?.success) {
        toast.success("Request Cancelled Successfully");
        const { sentRequest } = get();
        set({
          sentRequest: sentRequest.filter((req) => req._id !== requestId),
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Could not cancel request");
    }
  },
}));

export default requestStore;
