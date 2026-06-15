const RequestSent = () => {
  return (
    <section id="RequestSent" className="px-4 py-2">
      <h1 className="font-Bold text-2xl mb-8">Request Sent</h1>
      <div className="grid grid-cols-5 ">
        <div className="card card-body size-36 flex items-center justify-center bg-base-300 cursor-pointer transition-all duration-300 gap-4 ">
          <div className="flex items-center gap-2">
            <img
              src="/Image/default.png"
              alt="pfp"
              className="size-12 rounded-full"
            />
            <div>
                <h2>User1</h2>
                <p className="flex items-center gap-1 text-xs text-base-content/60">
                <span className="animate-pulse size-2 bg-emerald-600 rounded-full" />{" "}
                Online
                </p>

            </div>
          </div>
          <button type="button" className="btn btn-error btn-sm w-full">
            Cancel
          </button>
        </div>
        <div className="card card-body size-36 flex items-center justify-center bg-base-300 cursor-pointer transition-all duration-300 gap-4 ">
          <div className="flex items-center gap-2">
            <img
              src="/Image/default.png"
              alt="pfp"
              className="size-12 rounded-full"
            />
            <div>
                <h2>User1</h2>
                <p className="flex items-center gap-1 text-xs text-base-content/60">
                <span className="animate-pulse size-2 bg-emerald-600 rounded-full" />{" "}
                Online
                </p>

            </div>
          </div>
          <button type="button" className="btn btn-error btn-sm w-full">
            Cancel
          </button>
        </div>
        <div className="card card-body size-36 flex items-center justify-center bg-base-300 cursor-pointer transition-all duration-300 gap-4 ">
          <div className="flex items-center gap-2">
            <img
              src="/Image/default.png"
              alt="pfp"
              className="size-12 rounded-full"
            />
            <div>
                <h2>User1</h2>
                <p className="flex items-center gap-1 text-xs text-base-content/60">
                <span className="animate-pulse size-2 bg-emerald-600 rounded-full" />{" "}
                Online
                </p>

            </div>
          </div>
          <button type="button" className="btn btn-error btn-sm w-full">
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default RequestSent;
