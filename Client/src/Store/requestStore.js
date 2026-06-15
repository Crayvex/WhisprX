import { create } from "zustand";

const requestStore = create((set) => ({
    sentRequest: [],
    receivedRequest: [],
    getSentRequest: () => {

    },
    getReceivedRequest: () => {

    },
}))

export default requestStore;