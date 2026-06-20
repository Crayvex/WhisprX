import { Camera, Lock } from "lucide-react";
import { useState } from "react";
import userAuthStore from "../../../Store/userStore";
import { useNavigate } from "react-router-dom";

const Account = () => {

  const user = userAuthStore((state) => state.userAuth);
  const updateProfile = userAuthStore((state) => state.updateProfile);
  const isUpdatingProfile = userAuthStore((state) => state.isUpdatingProfile);
  const pfp = user?.profilePic;
  const [preview, setPreview] = useState(pfp || null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setPreview(base64Image);
      setSelectedFile(base64Image);
    };
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    try {
      await updateProfile({ profilePic: selectedFile });
      setSelectedFile(null);
    } catch (e) {
      // error handled in store
    }
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (!confirmed) return;

    try {
      await userAuthStore.getState().deleteAccount();
      // navigate to landing page after deletion
      navigate("/");
    } catch (e) {
      // error toast handled in store
    }
  };

  if (!user) return null;

  const navigate = useNavigate();

  return (
    <section id="Account" className="w-full h-full">
      <div className="w-full h-full px-6 py-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Account</h1>
        <div className="mx-auto w-[95%] lg:w-[85%] mt-6 grid gap-8 lg:grid-cols-3">
          {/* Left card */}
          <div className="col-span-1 rounded-2xl border border-base-200/60 bg-base-100 p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={preview || "/Image/default.png"}
                  alt="profile"
                  className="h-28 w-28 rounded-full object-cover border border-base-200"
                />
                <label className="absolute -right-1 -bottom-1 bg-base-200 rounded-full p-1 cursor-pointer">
                  <Camera />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUpdatingProfile} />
                </label>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-sm text-base-content/70">{user.email}</p>
              </div>
              <div className="mt-4 text-sm text-base-content/60">
                Member since: <span className="text-base-content">{user.createdAt?.split("T")[0]}</span>
              </div>
              <div className="mt-6 w-full">
                <button onClick={deleteAccount} className="w-full bg-red-400 rounded-md hover:bg-red-500 transition-colors py-2 text-red-900">Delete Account</button>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="col-span-2 rounded-2xl border border-base-200/60 bg-base-100 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-base-content/80">Username</label>
                <input value={user.username} readOnly className="rounded-xl border border-base-200 px-4 py-2 bg-base-200/40 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-base-content/80">Email</label>
                <input value={user.email} readOnly className="rounded-xl border border-base-200 px-4 py-2 bg-base-200/40 outline-none" />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-base-content/80">Profile image preview</label>
              <div className="mt-3 flex items-center gap-4">
                <img src={preview || "/Image/default.png"} alt="preview" className="h-20 w-20 rounded-xl object-cover border" />
                <div className="flex gap-2">
                  <label className="inline-flex items-center rounded-md border border-base-200 px-4 py-2 cursor-pointer bg-base-200/40">
                    Change
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUpdatingProfile} />
                  </label>
                  <button onClick={handleSave} disabled={!selectedFile || isUpdatingProfile} className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-base-100 disabled:opacity-50">{isUpdatingProfile ? "Saving..." : "Save"}</button>
                  <button onClick={() => { setPreview(pfp || null); setSelectedFile(null); }} className="inline-flex items-center rounded-md border px-4 py-2">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;