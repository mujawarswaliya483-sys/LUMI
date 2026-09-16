import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function CheckIn({ onBack, onContinue }) {

  // ==================================================
  // EMOTIONAL STATE
  // ==================================================

  const emotions = [
    {
      id: 'alone',
      label: 'I feel alone',
    },
    {
      id: 'overthinking',
      label: "I can't stop thinking",
    },
    {
      id: 'missing-someone',
      label: "I'm missing someone",
    },
    {
      id: 'overwhelmed',
      label: "I'm overwhelmed",
    },
    {
      id: 'frustrated',
      label: "I'm frustrated",
    },
    {
      id: 'stressed',
      label: "I'm stressed",
    },
    {
      id: 'low',
      label: "I feel low",
    },
    {
      id: 'dont-want-to-talk',
      label: "I don't want to talk",
    },
    {
      id: 'dont-know',
      label: "I don't know",
    },
  ]


  // ==================================================
  // REACT STATE
  // ==================================================
  //
  // selectedEmotion remembers which emotion the
  // user selected.
  //
  // selectedIntensity remembers the 0–10 value.
  // ==================================================

  const [selectedEmotion, setSelectedEmotion] =
    useState(null)

  const [selectedIntensity, setSelectedIntensity] =
    useState(null)


  // ==================================================
  // CONTINUE
  // ==================================================

  const handleContinue = () => {

    // Don't continue until both answers exist.

    if (
      selectedEmotion === null ||
      selectedIntensity === null
    ) {
      return
    }


    // Send both values to App.jsx.

    onContinue({
      emotion: selectedEmotion,
      intensityBefore: selectedIntensity,
    })

  }


  return (

    <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

      <div className="mx-auto max-w-2xl">


        {/* ========================================== */}
        {/* BACK */}
        {/* ========================================== */}

        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
        >
          <ArrowLeft size={17} />
          Back
        </button>


        {/* ========================================== */}
        {/* HEADER */}
        {/* ========================================== */}

        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
            LUMI CHECK-IN
          </p>


          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            What's happening right now?
          </h1>


          <p className="mt-4 max-w-xl leading-7 text-[#716b75]">
            You don't need to explain everything.
            Just choose what feels closest to your experience.
          </p>

        </div>


        {/* ========================================== */}
        {/* EMOTION OPTIONS */}
        {/* ========================================== */}

        <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            What feels closest?
          </h2>


          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            {emotions.map((emotion) => {

              const isSelected =
                selectedEmotion === emotion.id


              return (

                <button
                  key={emotion.id}
                  onClick={() =>
                    setSelectedEmotion(emotion.id)
                  }
                  className={`
                    rounded-2xl border p-4 text-left
                    text-sm font-medium transition
                    ${
                      isSelected
                        ? 'border-[#80668d] bg-[#f4edf7] text-[#5f4c67]'
                        : 'border-[#e8e0e9] bg-white text-[#514b54] hover:border-[#cbb9d2]'
                    }
                  `}
                >
                  {emotion.label}
                </button>

              )

            })}

          </div>

        </section>


        {/* ========================================== */}
        {/* INTENSITY */}
        {/* ========================================== */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            How heavy does it feel right now?
          </h2>


          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            Choose a number from 0 to 10.
            This is your own description of the moment,
            not a medical measurement.
          </p>


          {/* ---------------------------------------- */}
          {/* NUMBER BUTTONS */}
          {/* ---------------------------------------- */}

          <div className="mt-6 grid grid-cols-6 gap-2 sm:grid-cols-11">

            {Array.from(
              { length: 11 },
              (_, index) => {

                const isSelected =
                  selectedIntensity === index


                return (

                  <button
                    key={index}
                    onClick={() =>
                      setSelectedIntensity(index)
                    }
                    className={`
                      flex h-11 items-center justify-center
                      rounded-xl border text-sm font-medium
                      transition
                      ${
                        isSelected
                          ? 'border-[#80668d] bg-[#80668d] text-white'
                          : 'border-[#e8e0e9] bg-[#fcf8f5] text-[#716b75] hover:border-[#bda5cb]'
                      }
                    `}
                  >
                    {index}
                  </button>

                )

              }
            )}

          </div>


          <div className="mt-3 flex justify-between text-xs text-[#958d97]">

            <span>
              Very light
            </span>

            <span>
              Extremely heavy
            </span>

          </div>

        </section>


        {/* ========================================== */}
        {/* CONTINUE */}
        {/* ========================================== */}

        <button
          onClick={handleContinue}
          disabled={
            selectedEmotion === null ||
            selectedIntensity === null
          }
          className={`
            mt-8 flex w-full items-center
            justify-center gap-2 rounded-2xl
            px-6 py-4 text-sm font-semibold
            transition
            ${
              selectedEmotion !== null &&
              selectedIntensity !== null
                ? 'bg-[#29252d] text-white hover:bg-[#3b3540]'
                : 'cursor-not-allowed bg-[#e8e2e8] text-[#aaa2ab]'
            }
          `}
        >
          Continue
          <ArrowRight size={17} />
        </button>


      </div>

    </main>

  )
}

export default CheckIn