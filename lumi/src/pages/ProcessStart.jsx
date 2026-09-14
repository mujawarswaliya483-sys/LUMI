import {
  ArrowLeft,
  ArrowRight,
  Brain,
} from 'lucide-react'

import Lumi from '../components/Lumi'


// --------------------------------------------------
// PROCESS START
// --------------------------------------------------
//
// This screen begins the structured reflection route.
//
// IMPORTANT:
// This is NOT therapy and it is NOT a diagnosis.
//
// We are simply helping the user organize something
// that keeps returning to their mind.
//
// --------------------------------------------------

function ProcessStart({ onBack, onContinue }) {

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="mx-auto flex max-w-6xl items-center justify-between">

        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#716b75] transition hover:bg-white hover:text-[#29252d]"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="text-lg font-semibold tracking-tight">
          lumi
        </div>

        <div className="w-16" />

      </header>


      {/* ==================================================
          MAIN
      ================================================== */}

      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">


          {/* Lumi */}
          <div className="hidden justify-center lg:flex">
            <Lumi />
          </div>


          {/* Content */}
          <div>

            <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">

              <Brain size={17} />

              Process

            </div>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Let's slow down the thought for a moment.
            </h1>


            <p className="mt-5 max-w-xl text-base leading-7 text-[#716b75]">
              You don't need to solve everything right now.
              We'll simply look at what keeps coming back,
              one small step at a time.
            </p>


            {/* ==================================================
                PROCESS EXPLANATION
            ================================================== */}

            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-7">

              <div className="space-y-5">

                <div>

                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#958d97]">
                    Step 1
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    Notice what keeps returning
                  </p>

                </div>


                <div>

                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#958d97]">
                    Step 2
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    Understand what part affects you
                  </p>

                </div>


                <div>

                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#958d97]">
                    Step 3
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    Find what you may need right now
                  </p>

                </div>

              </div>


              <button
                onClick={onContinue}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540]"
              >
                Start reflecting
                <ArrowRight size={18} />
              </button>

            </div>


            <p className="mt-5 text-xs leading-5 text-[#958d97]">
              You can skip any question or stop whenever you want.
              LUMI does not diagnose or provide professional treatment.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ProcessStart