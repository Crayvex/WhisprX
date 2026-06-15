import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Settings from "../../Components/For User/For Settings/Settings";
import Preferences from "../../Components/For User/For Settings/Preferences";
import { useState } from "react";
import Chat from "../../Components/For User/For Chat/Chat";
import Requests from "../../Components/For User/For Requests/Requests";
import RequestSent from "../../Components/For User/For Requests/RequestSent";
import RequestReceived from "../../Components/For User/For Requests/RequestReceived";
import AddFriend from "../../Components/For User/For Requests/AddFriend";
import Profile from "../../Components/For User/For Profile/Profile";

const App = () => {
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);

  return (
    <section>
      <div className={`h-dvh max-h-screen w-dvw flex justify-between gap-4 relative bg-base-100 text-base-content`}>
        <div
          className={`cursor-pointer absolute h-full z-20 ${isNavbarHovered ? "backdrop-blur-2xl w-full" : ""}`}
        >
          <div
            className="group h-full w-[10%] min-w-16 md:w-16 md:hover:w-[20%] hover:w-[40%] transition-all duration-300 cursor-pointer bg-neutral text-neutral-content overflow-hidden "
            onMouseEnter={() => setIsNavbarHovered(true)}
            onMouseLeave={() => setIsNavbarHovered(false)}
          >
            <Navbar />
          </div>
        </div>
        <div className={`w-full h-[95%] transition-all duration-300 px-20 my-4`}>
          <Routes>
            <Route index element={<Outlet />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings/*" element={<Settings />}>
              <Route path="preferences" element={<Preferences />} />
            </Route>
            <Route path="chat" element={<Chat />}/>
            <Route path="requests/*" element={<Requests />}>
              <Route path="sent" element={<RequestSent />} />
              <Route path="received" element={<RequestReceived />}/>
              <Route path="send-request" element={<AddFriend />}/>
            </Route>
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default App;
