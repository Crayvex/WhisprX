import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import userAuthStore from "../../Store/userStore";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState("signup")

  const navigate = useNavigate();
  const signup = userAuthStore((state) => state.signup);
  const isSigningUp = userAuthStore((state) => state.isSigningUp);
  const login = userAuthStore((state) => state.login);
  const isLoggingIn = userAuthStore((state) => state.isLoggingIn);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if(state === "signup"){
        await signup({ username, email, password });
      }else{
        await login({ email, password })
      }
      navigate("/app");
    } catch {
      // Error toast is handled in userStore
    }
  };

  return (
    <section id="register" className="flex min-h-dvh items-center justify-center bg-base-200 px-4 py-8">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body gap-6">
          <div>
            <div className="flex justify-between items-center w-full">
              <h1 className="text-3xl font-bold text-base-content">Registration</h1>
              <a href="/" className="hover:bg-primary/20 px-2 scale-102 rounded py-1 transition-all duration-200">Back</a>
            </div>
            <p className="mt-1 text-sm text-base-content/70">
              Fill out the required information to register.
            </p>
          </div>

          <form id="register-form" className="flex flex-col gap-4" onSubmit={handleRegister}>
            {state === 'signup' ? (
              <label className="input input-bordered flex items-center gap-2 outline-0 w-full">
                <UserIcon className="size-4 opacity-70" />
                <input
                  type="text"
                  className="grow"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  value={username}
                  placeholder="Username"
                />
              </label>
            ) : ''}

            <label className="input input-bordered flex items-center gap-2 outline-0 w-full">
              <Mail className="size-4 opacity-70" />
              <input
                type="email"
                className="grow"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                placeholder="john@example.com"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 outline-0 w-full">
              <KeyRound className="size-4 opacity-70" />
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                value={password}
                placeholder="Password"
              />
              <button
                type="button"
                className="btn btn-ghost btn-xs btn-square"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
            </label>

            {state === "signup" ? (
              <button type="submit" className="btn btn-primary mt-2" disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Signing Up...
                  </>
                ) : (
                  state
                )}
              </button>
            ) : (
              <button type="submit" className="btn btn-primary mt-2" disabled={isSigningUp}>
                {isLoggingIn ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Logging In...
                  </>
                ) : (
                  state
                )}
              </button>
            )}

          </form>

          <p className="text-center text-sm text-base-content/70">
            Already have an account?{" "}
            <button type="button" onClick={() => state === "signup" ? setState("login") : setState("signup")} className="link link-primary">
              {state === "signup" ? "Login here" : "Signup here" }
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
