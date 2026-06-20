const Privacy = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Privacy</h1>

      <div className="space-y-8">
        {/* Security */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Security</h2>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Password</h3>

                <p className="text-base-content/70">
                  Keep your account secure by changing your password.
                </p>
              </div>

              <button className="btn bg-accent/80 hover:bg-accent/60 text-accent-content border-none">
                Change Password
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  Two Factor Authentication
                </h3>

                <p className="text-base-content/70">
                  Add an extra layer of account protection.
                </p>
              </div>

              <button className="btn btn-outline">Enable</button>
            </div>
          </div>
        </div>

        {/* Privacy Controls */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Privacy Controls</h2>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Profile Visibility</h3>

                <p className="text-base-content/70">
                  Decide who can view your profile.
                </p>
              </div>

              <select className="select select-bordered">
                <option>Everyone</option>
                <option>Friends</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Online Status</h3>

                <p className="text-base-content/70">
                  Control your active status visibility.
                </p>
              </div>

              <button className="btn text-accent-content bg-accent/80 hover:bg-accent/60 border-none">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Devices */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Devices</h2>

          <p className="text-base-content/70 mb-6">
            Check where your account is currently logged in.
          </p>

          <button className="btn btn-outline">View Active Sessions</button>
        </div>

        {/* Account Data */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Account Data</h2>

          <p className="text-base-content/70 mb-6">
            Manage your personal information and account data.
          </p>

          <div className="flex gap-4">
            <button className="btn text-success-content bg-success/80 hover:bg-success/60 border-none">
              Download Data
            </button>

            <button className="btn bg-red-500 hover:bg-red-700 text-accent-content border-none">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
