import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../Components/For Landing/Navbar";
import Footer from "../../Components/For Landing/Footer";

const LandingPage = () => {
  const landingRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // fade-up: staggered vertical reveal per element
      gsap.utils.toArray(".fade-up").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // fade-right: slide in from left individually
      gsap.utils.toArray(".fade-right").forEach((el, i) => {
        gsap.from(el, {
          x: -60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // fade-left: slide in from right individually
      gsap.utils.toArray(".fade-left").forEach((el, i) => {
        gsap.from(el, {
          x: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, landingRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={landingRef} className="min-h-screen bg-base-100 text-base-content selection:bg-primary/20 transition-colors duration-500 scroll-smooth">
      <Navbar />

      <section id="home" className="relative h-full min-h-180 overflow-hidden pt-4 fade-up">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-base-100 via-base-100/80 to-transparent pointer-events-none" />
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-8 fade-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs text-primary shadow-sm shadow-primary/10">
                Powerful private chat for teams.
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-3xl lg:text-6xl">
                WhisprX makes secure team conversations fast, private, and effortless.
              </h1>
              <p className="max-w-xl text-base-content/70 leading-8 text-base sm:text-lg">
                Move beyond slow group chat. WhisprX delivers encrypted messages, instant updates, and modern controls so your team can collaborate with confidence.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center fade-up">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-3xl bg-primary px-7 py-3 text-sm font-semibold text-base-100 shadow-xl shadow-primary/20 transition hover:bg-primary-focus"
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-3xl border border-base-200 px-7 py-3 text-sm text-base-content/80 transition hover:border-base-300 hover:text-base-content"
                >
                  Explore Features
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-base-200/60 bg-base-100 p-4 text-sm shadow-lg shadow-base-content/5">
                  <p className="text-2xl font-semibold text-primary">Instant flow</p>
                  <p className="mt-1 text-base-content/70">Messages appear immediately on every device.</p>
                </div>
                <div className="rounded-3xl border border-base-200/60 bg-base-100 p-4 text-sm shadow-lg shadow-base-content/5">
                  <p className="text-2xl font-semibold text-secondary">Private by default</p>
                  <p className="mt-1 text-base-content/70">All conversations are encrypted end to end.</p>
                </div>
                <div className="rounded-3xl border border-base-200/60 bg-base-100 p-4 text-sm shadow-lg shadow-base-content/5">
                  <p className="text-2xl font-semibold text-accent">Team control</p>
                  <p className="mt-1 text-base-content/70">Create rooms, invite members, and stay organized.</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl rounded-[2.5rem] border border-base-200/80 bg-base-100 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.18)] fade-left">
              <div className="absolute -left-10 -top-10 hidden h-40 w-40 rounded-full bg-primary/10 blur-3xl lg:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-base-200/60 bg-base-100 p-6">
                <div className="flex items-center justify-between text-sm text-base-content/60">
                  <span>WhisprX workspace</span>
                  <span className="rounded-full bg-success/20 px-3 py-1 text-success">Live</span>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-[1.75rem] border border-base-200/60 bg-base-100 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">Alice</p>
                    <p className="mt-3 text-base font-semibold text-base-content">Just shared the latest deployment note.</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-base-200/60 bg-base-100 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">Team alpha</p>
                    <p className="mt-3 text-base font-semibold text-base-content">Encrypted rooms, instant replies, no delays.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-base-200/60 bg-base-100 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-primary">Secure</p>
                    <p className="mt-3 text-base-content font-semibold">Built-in encryption</p>
                  </div>
                  <div className="rounded-3xl border border-base-200/60 bg-base-100 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-primary">Fast</p>
                    <p className="mt-3 text-base-content font-semibold">Low latency chat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-base-200/20 bg-base-200/95 px-6 py-24 fade-up h-screen min-h-[720px] transition-colors duration-500">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="left space-y-6 fade-right">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Features</p>
              <h2 className="text-3xl font-bold text-base-content sm:text-4xl">Only the chat features your app actually ships.</h2>
              <p className="max-w-xl text-base-content/70 leading-8">
                This is the real WhisprX experience: friend discovery, live online status, messaging with attachments, and lightweight profile controls.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-base-200/60 bg-base-100 p-6 shadow-2xl shadow-base-content/10 fade-up">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Friends</p>
                  <h3 className="mt-4 text-xl font-semibold text-base-content">Search and connect</h3>
                  <p className="mt-3 text-base-content/70 leading-7">Find users by username or email, then send and manage friend requests in-app.</p>
                </div>
                <div className="rounded-3xl border border-base-200/60 bg-base-100 p-6 shadow-2xl shadow-base-content/10 fade-up">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Presence</p>
                  <h3 className="mt-4 text-xl font-semibold text-base-content">Live online status</h3>
                  <p className="mt-3 text-base-content/70 leading-7">See who’s available now with real-time online indicators while browsing your contacts.</p>
                </div>
              </div>
            </div>

            <div className="right space-y-6 fade-left">
              <div className="rounded-[2rem] border border-base-200/60 bg-base-200/80 p-8 shadow-2xl shadow-base-content/5">
                <div className="grid gap-5 sm:grid-cols-3">
                  {[
                    {
                      label: "Chat messaging",
                      detail: "Send and receive text conversations in an easy-to-use interface.",
                    },
                    {
                      label: "Image sharing",
                      detail: "Attach pictures to messages for richer conversations.",
                    },
                    {
                      label: "Multiple themes",
                      detail: "Switch between polished dark and light modes for a look that fits your workflow.",
                    },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-base-200/60 bg-base-100 p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-primary">{item.label}</p>
                      <p className="mt-3 text-base-content/70 leading-7">{item.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[1.5rem] border border-base-200/60 bg-base-100 p-6 text-base-content/90">
                  <p className="font-semibold text-base-content">Real chat, no filler features.</p>
                  <p className="mt-3 leading-7">
                    Use WhisprX for the messaging flows your users actually interact with: quick discovery, live status, and polished chat controls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="px-6 py-24 fade-up h-screen min-h-[720px] bg-base-200/95 transition-colors duration-500">
        <div className="mx-auto flex h-full max-w-7xl items-center">
          <div className="grid w-full gap-14 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="space-y-6 fade-right">
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">Technology</p>
              <h2 className="text-3xl font-bold text-base-content sm:text-4xl">Secure chat architecture made for teams.</h2>
              <p className="max-w-xl text-base-content/70 leading-8">
                WhisprX blends encrypted messaging, instant updates, and lightweight performance so your conversations stay private and fluid in every environment.
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-3xl border border-base-200/60 bg-base-100 p-6 shadow-lg shadow-base-content/10 fade-up">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Encryption</p>
                  <h3 className="mt-4 text-xl font-semibold text-base-content">End-to-end by default</h3>
                  <p className="mt-3 text-base-content/70 leading-7">All conversations are secured automatically, without extra setup.</p>
                </div>
                <div className="rounded-3xl border border-base-200/60 bg-base-100 p-6 shadow-lg shadow-base-content/10 fade-up">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Sync</p>
                  <h3 className="mt-4 text-xl font-semibold text-base-content">Real-time message flow</h3>
                  <p className="mt-3 text-base-content/70 leading-7">Updates appear instantly across devices, keeping teams aligned and active.</p>
                </div>
              </div>
            </div>

            <div className="fade-left">
              <div className="rounded-[2rem] border border-base-200/60 bg-base-100 p-8 shadow-2xl shadow-base-content/10">
                <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-base-200/60 bg-base-100 p-5 shadow-lg shadow-base-content/5">
                      <p className="text-sm uppercase tracking-[0.2em] text-secondary">Performance</p>
                      <p className="mt-3 text-base font-semibold text-base-content">Fast, lightweight design</p>
                      <p className="mt-2 text-base-content/70 leading-7">Minimal load, maximum responsiveness for every interaction.</p>
                    </div>
                    <div className="rounded-3xl border border-base-200/60 bg-base-100 p-5 shadow-lg shadow-base-content/5">
                      <p className="text-sm uppercase tracking-[0.2em] text-secondary">Privacy</p>
                      <p className="mt-3 text-base font-semibold text-base-content">Secure by default</p>
                      <p className="mt-2 text-base-content/70 leading-7">Your team’s data stays private without sacrificing usability.</p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-[1.5rem] border border-base-200/60 bg-base-200/90 p-6 text-sm text-base-content/80 shadow-inner shadow-base-content/5">
                    <p className="font-semibold text-base-content">Streamlined workflow</p>
                    <p className="mt-3 leading-7">
                      WhisprX is designed to keep your conversation experience simple and powerful, with modern controls and speed for every user.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-base-200/20 bg-base-200/95 px-6 py-24 fade-up h-full min-h-[720px] transition-colors duration-500">
        <div className="mx-auto grid h-full max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-6 fade-right">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Need help?</p>
            <h2 className="text-3xl font-bold text-base-content sm:text-4xl">Talk to the WhisprX team.</h2>
            <p className="max-w-xl text-base-content/70 leading-8">
              Have a question about security, onboarding, or your workspace? Send a message and we’ll respond with the support your team deserves.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-base-200/60 bg-base-200/80 p-6">
                <p className="text-sm text-primary">Email</p>
                <p className="mt-2 text-lg font-semibold text-base-content">support@whisprx.com</p>
              </div>
              <div className="rounded-3xl border border-base-200/60 bg-base-200/80 p-6">
                <p className="text-sm text-primary">Response time</p>
                <p className="mt-2 text-lg font-semibold text-base-content">Within one business day</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-200/60 bg-base-200/80 p-8 shadow-2xl shadow-base-content/5 fade-left">
            <div className="mb-8 rounded-3xl border border-base-200/60 bg-base-100 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Send a message</p>
              <h3 className="mt-4 text-xl font-semibold text-base-content">Let us know what you need.</h3>
            </div>
            <form className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-3xl border border-base-200/60 bg-base-200/80 px-5 py-4 text-sm text-base-content outline-none transition focus:border-primary"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-3xl border border-base-200/60 bg-base-200/80 px-5 py-4 text-sm text-base-content outline-none transition focus:border-primary"
                />
              </div>
              <textarea
                rows={5}
                placeholder="Tell us how we can help"
                className="w-full rounded-3xl border border-base-200/60 bg-base-200/80 px-5 py-4 text-sm text-base-content outline-none transition focus:border-primary"
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-3xl bg-primary px-8 py-4 text-sm font-semibold text-base-100 transition hover:bg-primary-focus"
                >
                  Send Message
                </button>
                <a
                  href="#home"
                  className="inline-flex items-center justify-center rounded-3xl border border-base-200/60 px-8 py-4 text-sm text-base-content transition hover:border-base-300"
                >
                  Back to top
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default LandingPage;
