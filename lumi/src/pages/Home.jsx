import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import Lumi from '../components/Lumi'


// `onStart` is a prop coming from App.jsx.
//
// App.jsx gives Home this function:
//
// onStart={() => setScreen('role-selection')}
//
// Therefore, when we call onStart(),
// App.jsx changes the screen.
function Home({ onStart }) {

  return (
    <main className="min-h-screen overflow-hidden bg-[#fcf8f5] text-[#29252d]">

      {/* ==========================================
          BACKGROUND DECORATION
          ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#eadcff] opacity-50 blur-3xl" />

        <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-[#dff4ef] opacity-60 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#f8dfeb] opacity-40 blur-3xl" />

      </div>


      {/* ==========================================
          NAVIGATION
          ========================================== */}

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

        {/* LUMI logo */}

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#29252d] shadow-sm">

            <Sparkles
              size={18}
              strokeWidth={1.7}
              className="text-white"
            />

          </div>

          <span className="text-xl font-semibold tracking-[-0.03em]">
            lumi
          </span>

        </div>


        {/* Navigation links */}

        <div className="hidden items-center gap-8 text-sm text-[#716b75] md:flex">

          <a
            href="#how-it-works"
            className="transition-colors hover:text-[#29252d]"
          >
            How it works
          </a>

          <a
            href="#privacy"
            className="transition-colors hover:text-[#29252d]"
          >
            Privacy
          </a>

          <button className="rounded-full border border-[#ddd6dc] bg-white/70 px-5 py-2.5 font-medium text-[#29252d] transition hover:bg-white">
            Sign in
          </button>

        </div>

      </nav>


      {/* ==========================================
          HERO SECTION
          ========================================== */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 pb-16 pt-8 lg:px-10">

        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">


          {/* ======================================
              LEFT SIDE
              ====================================== */}

          <div className="max-w-2xl">

            {/* Small label */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e2dbe0] bg-white/70 px-4 py-2 text-sm text-[#716b75] backdrop-blur">

              <span className="h-2 w-2 rounded-full bg-[#9b7bb5]" />

              Emotional support, when you need it

            </div>


            {/* Main heading */}

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-[#29252d] sm:text-6xl lg:text-7xl">

              You don't have to

              <span className="block text-[#76558f]">
                figure it out alone.
              </span>

            </h1>


            {/* Description */}

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#716b75] sm:text-xl">

              When a difficult moment hits, LUMI helps you find the kind of
              support that fits what you need right now — someone who
              understands, a space to process, or simply a moment to breathe.

            </p>


            {/* ======================================
                MAIN CTA
                ====================================== */}

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <button
                // THIS IS THE IMPORTANT PART.
                //
                // `onStart` comes from App.jsx.
                //
                // When this button is clicked:
                //
                // Home
                //   ↓
                // onStart()
                //   ↓
                // App.jsx
                //   ↓
                // setScreen('role-selection')
                //   ↓
                // RoleSelection appears
                onClick={onStart}

                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#29252d] px-7 py-4 text-base font-medium text-white shadow-lg shadow-[#29252d]/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#3b3540]"
              >

                I'm having a difficult moment

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>


              <button className="rounded-full px-7 py-4 text-base font-medium text-[#625b65] transition hover:bg-white/70">
                Learn how LUMI works
              </button>

            </div>


            {/* Trust statement */}

            <div className="mt-9 flex items-center gap-3 text-sm text-[#817983]">

              <ShieldCheck
                size={17}
                strokeWidth={1.8}
              />

              <span>
                Private by design · No public profiles · You stay in control
              </span>

            </div>

          </div>


          {/* ======================================
              RIGHT SIDE — LUMI
              ====================================== */}

          <div className="relative flex min-h-[520px] items-center justify-center">

            {/* Large soft circle */}

            <div className="absolute h-[360px] w-[360px] rounded-full bg-white/60 shadow-[0_30px_100px_rgba(80,60,90,0.08)] backdrop-blur-sm sm:h-[440px] sm:w-[440px]" />


            {/* Inner glow */}

            <div className="absolute h-[250px] w-[250px] rounded-full bg-[#eee4f7] opacity-80 blur-2xl sm:h-[300px] sm:w-[300px]" />


            {/* Lumi component */}

            <Lumi />


            {/* Floating messages */}

            <div className="absolute left-[12%] top-[22%] animate-[float_5s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-sm text-[#776d7b] shadow-sm backdrop-blur">
              it's okay to pause
            </div>

            <div className="absolute right-[8%] top-[35%] animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-sm text-[#776d7b] shadow-sm backdrop-blur">
              one step at a time
            </div>

            <div className="absolute bottom-[20%] left-[15%] animate-[float_7s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-sm text-[#776d7b] shadow-sm backdrop-blur">
              you don't need all the answers
            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          HOW LUMI WORKS
          ========================================== */}

      <section
        id="how-it-works"
        className="relative z-10 border-t border-[#e9e1e6] bg-white/50 px-6 py-20"
      >

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#9675a8]">
            A different kind of support
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            The right support for this moment.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#716b75]">

            LUMI doesn't assume that everyone needs the same thing. It helps
            you understand what you need and guides you toward the next step.

          </p>


          {/* Support types */}

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">


            {/* CONNECT */}

            <div className="rounded-3xl border border-[#e9e1e6] bg-white p-6">

              <p className="text-sm font-medium text-[#9675a8]">
                CONNECT
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                Someone who understands
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7b737e]">

                Safe, pseudonymous companion support based on shared
                experience.

              </p>

            </div>


            {/* PROCESS */}

            <div className="rounded-3xl border border-[#e9e1e6] bg-white p-6">

              <p className="text-sm font-medium text-[#9675a8]">
                PROCESS
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                Make sense of it
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7b737e]">

                Structured reflection to slow down recurring thoughts and
                understand what is happening.

              </p>

            </div>


            {/* CALM */}

            <div className="rounded-3xl border border-[#e9e1e6] bg-white p-6">

              <p className="text-sm font-medium text-[#9675a8]">
                CALM
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                A quiet moment
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7b737e]">

                A short grounding experience when you don't want to talk.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          FOOTER
          ========================================== */}

      <footer
        id="privacy"
        className="relative z-10 border-t border-[#e9e1e6] px-6 py-8"
      >

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#817983] sm:flex-row">

          <p>
            © 2026 LUMI
          </p>

          <p>
            Support, not replacement for professional care.
          </p>

        </div>

      </footer>

    </main>
  )
}


export default Home