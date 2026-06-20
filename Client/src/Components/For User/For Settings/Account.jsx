import { Camera, Lock } from "lucide-react";
import userAuthStore from "../../../Store/userStore";

const Account = () => {

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
    <section id="Account" className="w-full h-full">
      <div className="w-full h-full px-4 py-2 overflow-y-auto">
        <h1 className="text-3xl font-bold">Account</h1>
        <div className="mx-auto w-[90%] mt-10 h-full flex flex-col gap-10">
          <div className="h-fit pb-52 w-full bg-base-100 text-base-content relative px-4 py-2 flex flex-col items-center gap-6">
            <h1 className="text-left w-full text-2xl font-bold">Account Details</h1>
            <div className="mt-10 w-full flex flex-col items-center">
              <label className="flex relative size-32 mb-8 cursor-pointer">
                <img
                  src={!pfp ? "/Image/default.png" : pfp}
                  alt="pfp"
                  className="size-32 rounded-full object-cover"
                />
                <Camera className="absolute right-0 bottom-0 text-base-content bg-base-300 rounded-full p-1 size-8" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
              <label
                htmlFor="name"
                className="my-4 text-base-content/80 text-sm w-[60%]"
              >
                Username:
                <div className="flex bg-base-300/25 rounded-2xl w-full justify-between px-4 py-2 my-2">
                  <input
                    type="text"
                    placeholder={user.username}
                    readOnly
                    className="outline-0 border-0 cursor-default"
                  />
                  <Lock />
                </div>
              </label>
              <label
                htmlFor=""
                className="mt-2 text-base-content/80 text-sm w-[60%]"
              >
                Email:
                <div className="flex bg-base-300/25 rounded-2xl w-full justify-between px-4 py-2 my-2">
                  <input
                    type="text"
                    placeholder={user.email}
                    readOnly
                    className="outline-0 border-0 cursor-default"
                  />
                  <Lock />
                </div>
              </label>
              <label
                htmlFor="name"
                className="mt-2 text-base-content/80 text-sm w-[60%]"
              >
                Email:
                <div className="flex bg-base-300/25 rounded-2xl w-full justify-between px-4 py-2 my-2">
                  <input
                    type="text"
                    placeholder={user.email}
                    readOnly
                    className="outline-0 border-0 cursor-default"
                  />
                  <Lock />
                </div>
              </label>
            </div>
            <div className="">
              <h1 className="text-base-content/60">
                Member Since:{" "}
                <span className="text-base-content">
                  {user.createdAt?.split("T")[0]}
                </span>
              </h1>
            </div>
            <h1 className="text-2xl font-bold">Delete Your Account</h1>
            <div className="flex items-center justify-between">
              <div></div>
              <button className="w-36 bg-red-400 rounded hover:bg-red-500 transition-all cursor-pointer text-red-900 h-8">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;