import { Check, ArrowRight } from 'lucide-react'

function SessionComplete({
  intensityBefore,
  intensityAfter,
  whatHelped,
  onContinue,
}) {

  // --------------------------------------------------
  // CALCULATE CHANGE
  // --------------------------------------------------
  //
  // Example:
  //
  // Before = 8
  // After  = 5
  //
  // Change = 3
  //
  // This is only a self-reported session change.
  // It does NOT prove that LUMI is clinically effective.
  // --------------------------------------------------

  const change =
    intensityBefore - intensityAfter


  const helpedLabels = {

    understood: 'being understood',

    'sorting-thoughts':
      'sorting your thoughts',

    'calming-down':
      'calming down',

    'having-space':
      'having some space',

    'next-step':
      'having a next step',

    'something-else':
      'something else',

  }


  const helpedText =
    helpedLabels[whatHelped] || 'something'


  return (

    <main className="flex min-h-screen items-center justify-center bg-[#fcf8f5] px-5 py-10 text-[#29252d]">

      <div className="w-full max-w-2xl text-center">


        {/* ------------------------------------------ */}
        {/* SUCCESS ICON */}
        {/* ------------------------------------------ */}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e8f1ed] text-[#54786b]">

          <Check size={30} />

        </div>


        {/* ------------------------------------------ */}
        {/* TITLE */}
        {/* ------------------------------------------ */}

        <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
          Reflection complete
        </p>


        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          You made some space for yourself.
        </h1>


        <p className="mx-auto mt-4 max-w-lg leading-7 text-[#716b75]">
          You didn't have to solve everything.
          You simply paused and noticed what was happening.
        </p>


        {/* ------------------------------------------ */}
        {/* BEFORE / AFTER */}
        {/* ------------------------------------------ */}

        <div className="mt-10 grid grid-cols-2 gap-4">

          <div className="rounded-3xl border border-[#e8e0e9] bg-white p-6">

            <p className="text-sm text-[#958d97]">
              Before
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {intensityBefore}
            </p>

            <p className="mt-1 text-xs text-[#958d97]">
              out of 10
            </p>

          </div>


          <div className="rounded-3xl border border-[#e8e0e9] bg-white p-6">

            <p className="text-sm text-[#958d97]">
              Now
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {intensityAfter}
            </p>

            <p className="mt-1 text-xs text-[#958d97]">
              out of 10
            </p>

          </div>

        </div>


        {/* ------------------------------------------ */}
        {/* CHANGE */}
        {/* ------------------------------------------ */}

        {change > 0 && (

          <div className="mt-5 rounded-2xl bg-[#f3edf5] px-5 py-4">

            <p className="text-sm leading-6 text-[#66596b]">

              Your self-reported intensity is
              <strong> {change} point{change !== 1 ? 's' : ''} lower </strong>
              than when you started.

            </p>

          </div>

        )}


        {change === 0 && (

          <div className="mt-5 rounded-2xl bg-[#f3edf5] px-5 py-4">

            <p className="text-sm leading-6 text-[#66596b]">
              It feels about the same right now.
              That's okay — noticing that is useful too.
            </p>

          </div>

        )}


        {change < 0 && (

          <div className="mt-5 rounded-2xl bg-[#f8eeee] px-5 py-4">

            <p className="text-sm leading-6 text-[#765d5d]">
              This moment feels heavier right now.
              You don't have to force yourself to feel better.
            </p>

          </div>

        )}


        {/* ------------------------------------------ */}
        {/* WHAT HELPED */}
        {/* ------------------------------------------ */}

        <div className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 text-left">

          <p className="text-sm text-[#958d97]">
            What helped
          </p>

          <p className="mt-2 text-lg font-medium">
            {helpedText}
          </p>

        </div>


        {/* ------------------------------------------ */}
        {/* NEXT */}
        {/* ------------------------------------------ */}

        <button
          onClick={onContinue}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#3b3540]"
        >
          Back to LUMI
          <ArrowRight size={17} />
        </button>


      </div>

    </main>

  )
}

export default SessionComplete