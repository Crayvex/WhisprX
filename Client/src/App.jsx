import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/For Landing/LandingPage";
import UserApp from "./Pages/For User/App";
import { useThemeStore } from "./Store/useThemeStore";
import Signup from "./Pages/For Landing/Signup";
import userAuthStore from "./Store/userStore";
import { Loader } from "lucide-react";

const App = () => {
  const theme = useThemeStore((state) => state.theme);

  const user = userAuthStore((state) => state.userAuth);
  const checkAuth = userAuthStore((state) => state.checkAuth);
  const isCheckingAuth = userAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <main
        data-theme={theme}
        className="h-dvh w-dvw flex justify-center items-center"
      >
        <Loader />
      </main>
    );
  }

  return (
    <main data-theme={theme}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={user ? <Navigate to={"/app"} /> : <Signup />}
        />
        <Route
          path="/app/*"
          element={user ? <UserApp /> : <Navigate to={"/signup"} />}
        />
      </Routes>
    </main>
  );
};

export default App;
