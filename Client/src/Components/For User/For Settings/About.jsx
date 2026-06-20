const About = () => {
  return (
    <div className="min-h-screen p-8 cursor-default">
      <h1 className="text-4xl font-bold mb-8 ">About</h1>

      <div className="space-y-8">
        {/* App Info */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Real-Time Chat App</h2>

          <p className="text-base-content/80 text-lg leading-relaxed">
            WhisprX is a modern real-time chat platform designed to bring people
            closer through fast, simple, and meaningful conversations. It allows
            users to connect with friends, discover new people, and build new
            connections through a smooth and interactive chatting experience.{" "}
            <br /> <br /> Built with a focus on speed, simplicity, and user
            experience, WhisprX provides real-time messaging that keeps
            conversations flowing instantly. Users can see online and offline
            activity, share images, and communicate seamlessly in a clean and
            modern environment. <br /> <br /> WhisprX is designed for everyone —
            whether you want to stay connected with friends, meet new people, or
            enjoy a reliable messaging experience. The platform focuses on
            creating a comfortable space where communication feels natural and
            effortless. <br /> <br />
            The application is built using modern web technologies including the
            MERN stack, Socket.IO for real-time communication, and TailwindCSS
            with DaisyUI for a responsive and user-friendly interface. Security
            and privacy are important parts of WhisprX, with features like
            secure authentication, protected user data, and privacy-focused
            account management. <br /> <br /> WhisprX combines modern technology
            with a simple design philosophy: making communication faster,
            easier, and more enjoyable for everyone.
          </p>
        </div>

        {/* Features */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Features</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Real-Time Messaging</h3>

                <p className="text-base-content/80">
                  Send and receive messages instantly.
                </p>
              </div>

              <span className="badge badge-lg px-6 py-4 rounded-2xl hover:bg-success/90 cursor-default bg-success text-success-content">Active</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Secure Accounts</h3>

                <p className="text-base-content/80">
                  Your account information is protected.
                </p>
              </div>

              <span className="badge badge-lg px-6 py-4 rounded-2xl hover:bg-success/90 cursor-default bg-success text-success-content">Secure</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">User Profiles</h3>

                <p className="text-base-content/80">
                  Customize your profile and manage settings.
                </p>
              </div>

              <span className="badge badge-lg px-6 py-4 rounded-2xl hover:bg-success/90 cursor-default bg-success text-success-content">Available</span>
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Built With</h2>

          <div className="flex flex-wrap gap-4">
            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">React</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">Node.js</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">Express</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">MongoDB</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">Socket.IO</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">DaisyUI</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">Tailwindcss</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">Zustand</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">React Router</div>

            <div className="badge badge-lg bg-accent/60 rounded-2xl px-6 py-4 cursor-pointer hover:bg-accent/80 transition-all">Cloudinary</div>
          </div>
        </div>

        {/* Developer */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">Developer</h2>

          <p className="text-base-content/80 text-lg mb-6">
            This application was designed and developed with a focus on
            performance, simplicity, and a smooth chatting experience.
          </p>

          <button className="btn bg-accent/80 hover:bg-accent/90 text-accent-content border-none">
            Contact Developer
          </button>
        </div>

        {/* Version */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl w-full">
          <h2 className="text-3xl font-bold mb-6">App Information</h2>

          <div className="space-y-3 text-base-content/80">
            <p>Version: 1.0.0</p>

            <p>Release Date: June 2026</p>

            <p>License: MIT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
