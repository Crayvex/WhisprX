import { Camera, Eye, EyeOff, Lock, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import userAuthStore from "../../../Store/userStore";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const user = userAuthStore((state) => state.userAuth);
  const updateProfile = userAuthStore((state) => state.updateProfile);
  const changePassword = userAuthStore((state) => state.changePassword);
  const logout = userAuthStore((state) => state.logout);
  const deleteAccountAction = userAuthStore((state) => state.deleteAccount);
  const isUpdatingProfile = userAuthStore((state) => state.isUpdatingProfile);
  const isChangingPassword = userAuthStore((state) => state.isChangingPassword);

  const navigate = useNavigate();
  const pfp = user?.profilePic;

  const [selectedFile, setSelectedFile] = useState(null);
  const preview = selectedFile || pfp || null;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedFile(base64Image);
    };
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    try {
      await updateProfile({ profilePic: selectedFile });
      setSelectedFile(null);
    } catch {
      // error handled in store
    }
  };

  const handlePasswordChange = async () => {
    setPasswordSuccess("");
    setPasswordError("");

    try {
      await changePassword({ currentPassword, newPassword, confirmPassword });
      setPasswordSuccess("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setPasswordError("Failed to change password");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signup");
    } catch {
      // error toast handled in store
    }
  };
  
  const deleteAccount = async () => {
    try {
      await deleteAccountAction();
      navigate("/");
    } catch {
      // error handled in store
    }
  };
  
  useEffect(() => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }, [])

  if (!user) return null;

  return (
    <section id="Account" className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Account</h1>

      <div className="space-y-8">
        {/* Profile */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Profile</h2>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="relative inline-flex">
                <div className="w-32 relative rounded-full ring ring-accent overflow-hidden">
                  <img
                    src={preview || "/Image/default.png"}
                    alt="profile"
                    className="h-32 w-32 object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 rounded-full bg-base-200 p-2 shadow-lg cursor-pointer">
                  <Camera className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              <h3 className="text-xl font-bold mt-4">{user.username}</h3>

              <p className="text-base-content/60 text-sm">{user.email}</p>

              <p className="text-base-content/30 text-xs mt-3">
                Member since: {user.createdAt?.split("T")[0] || "Unknown"}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleSave}
                  disabled={!selectedFile || isUpdatingProfile}
                  className="btn bg-primary hover:bg-primary/80 cursor-pointer text-white border-none"
                >
                  {isUpdatingProfile ? "Saving..." : "Save Image"}
                </button>
                {selectedFile && (
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div>
                <label className="block mb-2">Username</label>

                <div className="input input-bordered w-full outline-0 flex items-center">
                  <input
                    className="w-full outline-0"
                    placeholder={user.username}
                    readOnly
                  />
                  <Lock />
                </div>
              </div>

              <div>
                <label className="block mb-2">Email</label>

                <div className="input input-bordered w-full outline-0 flex items-center">
                  <input
                    className="w-full outline-0"
                    placeholder={user.email}
                    readOnly
                  />
                  <Lock />
                </div>
              </div>

              {/* <div className="flex gap-4">
                <button className="btn bg-accent/80 text-white border-none">
                  Save Changes
                </button>

                <button className="btn btn-outline">Cancel</button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Account Actions</h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <div className="w-full grid gap-4 sm:grid-cols-[1fr_auto] items-start">
                  <div>
                    <h3 className="font-semibold text-lg">Change Password</h3>
                    <p className="text-base-content/60">
                      Update your login password.
                    </p>
                  </div>
                  <button
                    onClick={handlePasswordChange}
                    disabled={isChangingPassword}
                    className="btn bg-accent/80 text-white border-none"
                  >
                    {isChangingPassword ? "Saving..." : "Change"}
                  </button>
                </div>
                <div className="grid gap-4 mt-4">
                  <input
                    type="text"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                    className="input input-bordered w-full outline-0"
                  />
                  <label className="input input-bordered w-full outline-0">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs btn-square"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </button>
                  </label>
                  <label className="input input-bordered w-full outline-0">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs btn-square"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </button>
                  </label>
                  {passwordSuccess && (
                    <p className="text-success">{passwordSuccess}</p>
                  )}
                  {passwordError && (
                    <p className="text-error">{passwordError}</p>
                  )}
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Logout From All Devices
                    </h3>
                    <p className="text-base-content/60">
                      Remove all active sessions.
                    </p>
                  </div>
                  <button onClick={handleLogout} className="btn btn-outline hover:bg-red-600 transition-all">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold text-red-500 mb-6">Danger Zone</h2>

          <p className="text-base-content/60 mb-6">
            Permanently delete your account and all associated data.
          </p>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn bg-red-500 text-white border-none"
          >
            Delete Account
          </button>

          {showDeleteConfirm && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-base-300 rounded-2xl p-6 shadow-xl max-w-sm w-[85%] flex flex-col items-center gap-4">
                <Trash className="size-8 text-red-500" />
                <p className="text-lg font-semibold text-center">
                  Delete Your Account?
                </p>
                <p className="text-sm text-base-content/60 text-center">
                  This action cannot be undone.
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-2 rounded-xl bg-base-200 hover:bg-base-100 transition-all cursor-pointer font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteAccount}
                    className="flex-1 py-2 rounded-xl bg-red-500 text-warning-content hover:bg-red-400 transition-all cursor-pointer font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Account;

// return (
