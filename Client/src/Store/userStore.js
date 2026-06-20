import { create } from "zustand"
import axiosInstance from "../Libs/axiosInstance";
import { toast } from "react-toastify";
import { io } from "socket.io-client"
import messageStore from "./messageStore";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const userAuthStore = create((set, get) => ({
  userAuth: null,
  isSigningUp: false,
  isLoggingin: false,
  // Start as checking auth so we don't render protected routes
  // before the initial /auth/check-Auth request finishes.
  isCheckingAuth: true,
  isVerifyingOTP: false,
  isUpdatingProfile: false,
  profilePic: null,
  onlineUsers: [],
  socket: null,

  signup: async ({ username, email, password }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      set({ userAuth: res.data.user });
      toast.success("User Created!!")
      // get().connectSocket();
      return res.data.user;
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || e.message || "Could not register";
      toast.error(errorMessage);
      throw e; // Re-throw to allow component to handle if needed
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async ({ email, password }) => {
    set({ isLoggingin: true });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      set({ userAuth: res.data.user });
      toast.success("User Logged In Successfully");
      get().connectSocket();
      return res.data.user;
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || e.message || "Could not login";
      toast.error(errorMessage);
      throw e; // Re-throw to allow component to handle if needed
    } finally {
      set({ isLoggingin: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({userAuth: null});
      toast.success("Logged Out Successfully");
      get().disconnectSocket();
    } catch (e) {
      toast.error("Logged Out Failed");
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/me");
      console.log("CheckAuth response:", res.data); // Debug log
      if (res.data && res.data.user) {
        set({ userAuth: res.data.user });
        set({ profilePic: res.data.user.profilePic });
        get().connectSocket();
        return res.data.user;
      } else {
        console.error("Unexpected response structure:", res.data);
        set({ userAuth: null });
        return null;
      }
    } catch (e) {
      // Don't show error toast for 401 (unauthorized) - it's expected if user is not logged in
      if (e.response?.status !== 401) {
        console.error("Auth check error:", e.response?.data || e.message);
      } else {
        console.log("User not authenticated (401)");
      }
      set({ userAuth: null });
      return null;
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  getUserDetail: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-User");
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log("Error in get User: ", e);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ userAuth: res.data.user });
      set({ profilePic: res.data.user.profilePic });
      toast.success("Profile updated successfully");
      return res.data.user;
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to update profile");
      throw error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  deleteAccount: async () => {
    try {
      const res = await axiosInstance.delete("/auth/delete-profile");
      set({ userAuth: null });
      get().disconnectSocket();
      toast.success(res.data?.message || "Account deleted");
      return res.data;
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to delete account");
      throw error;
    }
  },
  connectSocket: () => {
    const { userAuth, socket: existingSocket } = get();
    if (!userAuth) return;

    if (existingSocket?.connected) {
      existingSocket.disconnect();
    }

    const socket = io(BASE_URL, {
      withCredentials: true,
      autoConnect: false,
    });

    set({ socket });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection failed:', error.message || error);
    });

    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.on('receiveMessage', (message) => {
      messageStore.getState().appendIncomingMessage(message);
    });

    socket.connect();
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
    }
    set({ socket: null, onlineUsers: [] });
  }
}));

export default userAuthStore;