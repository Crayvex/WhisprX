import { Camera, Lock, User } from "lucide-react";
import userAuthStore from "../../../Store/userStore";

const Profile = () => {
  const user = userAuthStore((state) => state.userAuth);
  const updateProfile = userAuthStore((state) => state.updateProfile);
  const isUpdatingProfile = userAuthStore((state) => state.isUpdatingProfile);
  const pfp = user?.profilePic;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
    };
  };

  if (!user) return null;

  return (
    <section id="Profile" className="w-[50%] mx-auto h-full">
      <div className="h-full w-full bg-accent text-accent-content px-4 py-2 flex flex-col gap-6 items-center">
        <h1 className="text-4xl text-center flex gap-2 items-center justify-center "><User className="size-8"/> Profile</h1>
        <div className="mt-10 flex flex-col items-center">
          <label className="flex relative size-20 mb-8 cursor-pointer">
            <img
              src={!pfp ? "/Image/default.png" : pfp}
              alt="pfp"
              className="size-20 rounded-full object-cover"
            />
            <Camera className="absolute right-0 bottom-0 text-base-content bg-base-300 rounded-full p-1 size-6" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
          <label htmlFor="name" className="flex bg-base-300/25 rounded-2xl w-full justify-between px-4 py-2 my-2">Username:
            <input type="text" placeholder={user.username} readOnly className="outline-0 border-0 cursor-default"/>
            <Lock />
          </label>
          <label htmlFor="name" className="flex bg-base-300/25 rounded-2xl w-full justify-between px-4 py-2 my-2">Email:
            <input type="text" placeholder={user.email} readOnly className="outline-0 border-0 cursor-default"/>
            <Lock />
          </label>
        </div>
        <div className="absolute bottom-8 ">
            <h1 className="text-base-content/60">Member Since: <span className="text-base-content">{user.createdAt?.split('T')[0]}</span></h1>
        </div>
      </div>
    </section>
  );
};

export default Profile;
