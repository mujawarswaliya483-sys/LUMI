import { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'

function ProcessOutcome({ onBack, onContinue }) {

  // --------------------------------------------------
  // AFTER INTENSITY
  // --------------------------------------------------
  //
  // This stores how the user feels AFTER the
  // PROCESS experience.
  //
  // This is self-reported.
  // It is NOT a medical measurement.
  // --------------------------------------------------

  const [intensityAfter, setIntensityAfter] = useState(null)


  // --------------------------------------------------
  // WHAT HELPED
  // --------------------------------------------------

  const [whatHelped, setWhatHelped] = useState(null)


  // --------------------------------------------------
  // POSSIBLE ANSWERS
  // --------------------------------------------------

  const helpfulOptions = [
    {
      id: 'understood',
      label: 'Being understood',
    },
    {
      id: 'sorting-thoughts',
      label: 'Sorting my thoughts',
    },
    {
      id: 'calming-down',
      label: 'Calming down',
    },
    {
      id: 'having-space',
      label: 'Having some space',
    },
    {
      id: 'next-step',
      label: 'Having a next step',
    },
    {
      id: 'something-else',
      label: 'Something else',
    },
  ]


  // --------------------------------------------------
  // CONTINUE
  // --------------------------------------------------

  const handleContinue = () => {

    // Don't continue until the user has
    // selected both answers.

    if (
      intensityAfter === null ||
      whatHelped === null
    ) {
      return
    }


    // Send the outcome back to App.jsx.

    onContinue({
      intensityAfter,
      whatHelped,
    })

  }


  return (

    <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

      <div className="mx-auto max-w-2xl">


        {/* ------------------------------------------ */}
        {/* BACK BUTTON */}
        {/* ------------------------------------------ */}

        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
        >
          <ArrowLeft size={17} />
          Back
        </button>


        {/* ------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------ */}

        <div className="mb-10">

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
            After reflection
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How are you feeling now?
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-[#716b75]">
            There is no right answer. Just notice how the moment
            feels compared with when you started.
          </p>

        </div>


        {/* ------------------------------------------ */}
        {/* INTENSITY */}
        {/* ------------------------------------------ */}

        <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            How heavy does it feel right now?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            Choose a number from 0 to 10.
            This is only your own description of how you feel.
          </p>


          {/* ---------------------------------------- */}
          {/* NUMBER GRID */}
          {/* ---------------------------------------- */}

          <div className="mt-6 grid grid-cols-6 gap-2 sm:grid-cols-11">

            {Array.from({ length: 11 }, (_, index) => (

              <button
                key={index}
                onClick={() =>
                  setIntensityAfter(index)
                }
                className={`
                  flex h-11 items-center justify-center rounded-xl
                  border text-sm font-medium transition
                  ${
                    intensityAfter === index
                      ? 'border-[#80668d] bg-[#80668d] text-white'
                      : 'border-[#e8e0e9] bg-[#fcf8f5] text-[#716b75] hover:border-[#bda5cb]'
                  }
                `}
              >
                {index}
              </button>

            ))}

          </div>


          <div className="mt-3 flex justify-between text-xs text-[#958d97]">

            <span>
              Much lighter
            </span>

            <span>
              Still heavy
            </span>

          </div>

        </section>


        {/* ------------------------------------------ */}
        {/* WHAT HELPED */}
        {/* ------------------------------------------ */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            What helped most?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            Your answer helps LUMI understand what kind of support
            may work better for you next time.
          </p>


          <div className="mt-6 space-y-3">

            {helpfulOptions.map((option) => {

              const isSelected =
                whatHelped === option.id


              return (

                <button
                  key={option.id}
                  onClick={() =>
                    setWhatHelped(option.id)
                  }
                  className={`
                    flex w-full items-center justify-between
                    rounded-2xl border p-4 text-left transition
                    ${
                      isSelected
                        ? 'border-[#80668d] bg-[#f4edf7]'
                        : 'border-[#e8e0e9] bg-white hover:border-[#cbb9d2]'
                    }
                  `}
                >

                  <span className="text-sm font-medium">
                    {option.label}
                  </span>


                  {isSelected && (

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#80668d] text-white">

                      <Check size={15} />

                    </span>

                  )}

                </button>

              )

            })}

          </div>

        </section>


        {/* ------------------------------------------ */}
        {/* CONTINUE */}
        {/* ------------------------------------------ */}

        <button
          onClick={handleContinue}
          disabled={
            intensityAfter === null ||
            whatHelped === null
          }
          className={`
            mt-8 w-full rounded-2xl px-6 py-4
            text-sm font-semibold transition
            ${
              intensityAfter !== null &&
              whatHelped !== null
                ? 'bg-[#29252d] text-white hover:bg-[#3b3540]'
                : 'cursor-not-allowed bg-[#e8e2e8] text-[#aaa2ab]'
            }
          `}
        >
          Finish reflection
        </button>


      </div>

    </main>

  )
}

export default ProcessOutcome