import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Clock, Star, ChevronRight } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const features = [
  {
    icon: Sparkles,
    title: "25+ AI Templates",
    desc: "From blog posts to code generation — every use case covered out of the box.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Zap,
    title: "Instant Results",
    desc: "Powered by Gemini 2.0 Flash. Generate high-quality content in seconds.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    desc: "Your data stays private. No content is stored without your permission.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Clock,
    title: "Full History",
    desc: "Every generation is saved. Search, copy and reuse past outputs anytime.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

const stats = [
  { value: "25+", label: "Templates" },
  { value: "10x", label: "Faster Writing" },
  { value: "100%", label: "AI Powered" },
  { value: "Free", label: "To Start" },
];

export default async function Home() {
  const user = await currentUser();
  if (user) redirect("/dashboard");
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="logo" width={36} height={36} />
            <span className="text-xl font-bold gradient-text">Handy AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-1.5 text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Get started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-20">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Gemini 2.0 Flash
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Create Better Content{" "}
            <span className="gradient-text">10x Faster</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop staring at a blank page. Handy AI uses advanced AI to generate
            blog posts, social captions, code, emails and more — in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all glow text-base"
            >
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 border border-border bg-background text-foreground font-semibold px-8 py-4 rounded-xl hover:bg-muted transition-all text-base"
            >
              Sign in
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-card rounded-2xl p-4 text-center"
              >
                <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Everything you need to{" "}
              <span className="gradient-text">write faster</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              One tool. Every content type. Zero writer's block.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`inline-flex p-3 rounded-xl ${f.bg} mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative">
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-3">
                Ready to create amazing content?
              </h2>
              <p className="text-violet-200 mb-8 text-base">
                Join thousands of creators using Handy AI every day.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-4 rounded-xl hover:bg-violet-50 transition-colors text-base"
              >
                Get started free <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={24} height={24} />
            <span className="font-semibold text-foreground">Handy AI</span>
          </div>
          <p>© 2025 Handy AI. Built by{" "}
            <a href="https://www.linkedin.com/in/sahil-sheshank-203557255/" target="_blank" className="text-primary hover:underline font-medium">
              Sahil Sheshank
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
