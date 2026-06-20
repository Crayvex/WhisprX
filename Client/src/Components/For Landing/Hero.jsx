import React from "react";
import {
  MessageSquare,
  Zap,
  Shield,
  Sparkles,
  Layers,
  Share2,
  ArrowRight,
  CheckCircle2,
  Lock as Twitter,
  X as Github,
  Menu as Linkedin,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-gray-100 font-sans relative overflow-hidden selection:bg-purple-500/30">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HEADER / NAV --- */}
      <header className="border-b border-gray-800/40 backdrop-blur-md sticky top-0 z-50 bg-[#0A0A0C]/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {/* <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm">
              WX
            </span> */}
            <img src="/Image/WhisprX logo.png" className="rounded-full size-10 p-0" alt="" />
            WhisprX
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/signup" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30">
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-medium text-purple-300 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Spatial Chat
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            Conversations That <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 bg-clip-text text-transparent">
              Feel Instant.
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Connect flawlessly with real-time audio channels, ultra-low latency
            text streams, and interactive canvas components. Built for teams who
            design, program, and build the future together.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all shadow-xl shadow-purple-600/20 flex items-center gap-2 group">
              Start Chatting{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-7 py-3.5 bg-gray-900/80 hover:bg-gray-800/80 border border-gray-800 text-gray-200 font-medium rounded-xl transition-all backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
          <div className="flex items-center gap-6 pt-6 border-t border-gray-900 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-purple-500" /> End-to-end
              encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-500" /> Decentralized
              network architecture
            </span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[440px] aspect-square rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-950/50 p-6 shadow-2xl backdrop-blur-sm flex items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-teal-500/10 opacity-60 pointer-events-none" />
            {/* Holographic Isometric Graphic Representation */}
            <div className="relative w-4/5 h-4/5 border border-purple-500/20 rounded-2xl bg-black/40 shadow-inner flex flex-col p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="text-[10px] text-gray-500 tracking-widest font-mono">
                  WORKSPACE_A
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-end space-y-3">
                <div className="bg-purple-500/10 border border-purple-500/20 self-start rounded-xl rounded-bl-none p-3 max-w-[80%] text-xs text-purple-200">
                  Are we deployed yet?
                </div>
                <div className="bg-teal-500/10 border border-teal-500/20 self-end rounded-xl rounded-br-none p-3 max-w-[80%] text-xs text-teal-200">
                  Yes! Pipeline is completely green. 🚀
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE FEATURES --- */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-900"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Core Features
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Every feature is fine-tuned for high-velocity teams who rely on
            flawless communications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="text-purple-400" />,
              title: "Real-Time Metadata",
              desc: "No delays, zero server-side buffers. Raw socket events directly.",
            },
            {
              icon: <MessageSquare className="text-teal-400" />,
              title: "Instant Dynamic Stream",
              desc: "Thread updates cascade effortlessly across all active viewports.",
            },
            {
              icon: <Layers className="text-pink-400" />,
              title: "Panel Routing",
              desc: "Easily segment workstreams, channels, and logs.",
            },
            {
              icon: <Shield className="text-blue-400" />,
              title: "Unique Multi-Tenancy",
              desc: "Isolate individual team environments natively.",
            },
            {
              icon: <Sparkles className="text-yellow-400" />,
              title: "Query Combinators",
              desc: "Filter and search chat contexts programmatically.",
            },
            {
              icon: <Share2 className="text-purple-400" />,
              title: "Native Shared States",
              desc: "Sync custom app canvases directly inside individual viewports.",
            },
          ].map((feat, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl border border-gray-800/60 bg-gray-900/20 hover:bg-gray-900/40 hover:border-gray-700/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- A CONVERSATION UNFOLDING (LIVE DEMO INTERFACE) --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A Conversation, Unfolding
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Interact natively inside complex dynamic environments. Watch
              context-rich logs dynamically filter, sign, and route
              automatically as teams communicate across disparate geo-nodes.
            </p>
          </div>
          <div className="lg:col-span-7 bg-[#0F0F13] border border-gray-800/80 rounded-2xl p-6 grid md:grid-cols-2 gap-6 shadow-2xl relative">
            {/* Left Stream View */}
            <div className="space-y-4 border-r border-gray-800/60 pr-0 md:pr-6">
              <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-xs space-y-1">
                <span className="text-purple-400 font-mono block">
                  @austin_dev
                </span>
                <p className="text-gray-300">
                  Are we ready to spin up the next node infrastructure cluster?
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-600/10 border border-purple-500/20 text-xs space-y-1 self-end">
                <span className="text-purple-300 font-mono block">@you</span>
                <p className="text-purple-100">
                  Yeah, ready to pull the trigger on it.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-xs space-y-2">
                <span className="text-teal-400 font-mono block">
                  @bot_deploy
                </span>
                <div className="flex gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px]">
                    PROD
                  </span>{" "}
                  <span className="text-gray-400">Node initialized.</span>
                </div>
              </div>
            </div>

            {/* Right Stream View (Live Indicators) */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider font-mono text-gray-500">
                  Live Indicators
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-900/40 text-xs">
                  <span className="text-gray-400">Austin is typing...</span>
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-900/40 text-xs">
                  <span className="text-gray-400">Active Node Peers</span>
                  <span className="font-mono text-purple-400">92/100</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-800/60">
                <div className="text-[11px] font-mono text-gray-500 mb-1.5">
                  CONNECTED CONTEXT
                </div>
                <div className="bg-black/40 border border-gray-800 p-2.5 rounded-lg text-xs font-mono text-teal-400">
                  us-east-1.node.thread
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-900 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "1,248,392", label: "Messages Streamed" },
            { val: "182,450", label: "Assets Sync'd" },
            { val: "542,210", label: "Panel Connectors" },
            { val: "92", label: "Clusters Deployed" },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.val}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CUSTOM SPACES / PERSONALIZATION --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900">
        <div className="max-w-2xl mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Personalize Your Space
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Choose a layout archetype suited precisely to your operational
            workflows.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {["Minimalist", "Developer", "Matrix", "Focused", "Operator"].map(
            (space, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${idx === 0 ? "border-purple-500/40 bg-purple-950/10" : "border-gray-800/60 bg-gray-900/10 hover:border-gray-700/60"}`}
              >
                <div className="aspect-video w-full rounded-lg bg-gray-950 mb-4 border border-gray-900 flex items-center justify-center text-xs font-mono text-gray-600">
                  {space.toUpperCase()} VIEW
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {space}
                </h4>
                <p className="text-xs text-gray-500">
                  Fine-tuned layout module.
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Voices from the Network
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "NovaThread radically accelerated our cross-continental infra sync pipelines. Absolute game-changer.",
              user: "Derrick H., Principal DevOps",
            },
            {
              quote:
                "The zero-buffer architecture is tangible. Moving from standard tooling felt like entering hyper-drive.",
              user: "Yasin Z., CTO",
            },
            {
              quote:
                "We write custom canvas elements natively inside our messaging layout UI seamlessly.",
              user: "Jane S., Systems Lead",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gray-900/20 border border-gray-800/60 flex flex-col justify-between space-y-6"
            >
              <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="text-xs font-mono text-purple-400">
                — {t.user}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section
        id="faq"
        className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900"
      >
        <h2 className="text-3xl font-bold text-white tracking-tight mb-12 text-center">
          Frequently Asked
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              q: "How raw is metadata?",
              a: "Messages move directly across edge points without passing standard server memory state processing steps.",
            },
            {
              q: "Can I self-host clusters?",
              a: "Enterprise provisions allow fully segregated on-prem or isolated private node architectures.",
            },
            {
              q: "Is text data encrypted?",
              a: "Completely. Standard implementations route structural end-to-end payload matrices cleanly.",
            },
            {
              q: "Is my data secure?",
              a: "All communication routes leverage highly resilient cryptographic network validation keys.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-sm sm:text-base font-semibold text-white">
                {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-gray-950 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-24 bg-purple-500/10 blur-[50px] pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Join the Conversation.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Experience immediate infrastructure agility. Establish your
              isolated mesh-ready space today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button className="px-8 py-3.5 bg-white hover:bg-gray-100 text-black font-semibold rounded-xl text-sm transition-all shadow-lg">
                Create Account
              </button>
              <button className="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white font-semibold rounded-xl text-sm transition-all">
                Contact Architect
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-900 bg-[#070709] text-gray-500 text-xs py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="font-bold text-white text-sm tracking-tight">
              NovaThread
            </div>
            <p className="max-w-xs text-gray-600">
              Pure, zero-latency spatial messaging architectures designed for
              hyper-growth teams.
            </p>
          </div>
          <div className="flex gap-8 text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Status
            </a>
          </div>
          <div className="flex gap-4 text-gray-400">
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-lg hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-lg hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-lg hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-700 mt-8 pt-6 border-t border-gray-950">
          &copy; {new Date().getFullYear()} NovaThread Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Hero;
