import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function ConnectOutcome({ onBack, onContinue }) {

  // Stores the user's self-reported intensity after
  // the conversation.
  const [selectedIntensity, setSelectedIntensity] = useState(null)

  // Stores what the user felt helped them.
  const [selectedHelp, setSelectedHelp] = useState(null)

  const helpOptions = [
    {
      id: 'understood',
      label: 'Being understood',
    },
    {
      id: 'talking',
      label: 'Talking to someone',
    },
    {
      id: 'sharing',
      label: 'Sharing my experience',
    },
    {
      id: 'having-space',
      label: 'Having some space',
    },
    {
      id: 'nothing',
      label: 'Nothing in particular',
    },
  ]

  // Continue only when both questions
  // have been answered.
  const handleContinue = () => {

    if (
      selectedIntensity === null ||
      selectedHelp === null
    ) {
      return
    }

    onContinue({
      intensityAfter: selectedIntensity,
      whatHelped: selectedHelp,
    })
  }

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

      <div className="mx-auto max-w-2xl">

        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
        >
          <ArrowLeft size={17} />
          Back
        </button>


        {/* Heading */}
        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
            LUMI CHECK-IN
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            How are you feeling now?
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-[#716b75]">
            There is no right answer. Just tell LUMI
            how this moment feels after your conversation.
          </p>

        </div>


        {/* Intensity section */}
        <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            How heavy does it feel right now?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            Choose a number from 0 to 10.
            This is your own description of the moment,
            not a medical measurement.
          </p>


          {/* 0–10 buttons */}
          <div className="mt-6 grid grid-cols-6 gap-2 sm:grid-cols-11">

            {Array.from({ length: 11 }, (_, index) => {

              const isSelected =
                selectedIntensity === index

              return (
                <button
                  key={index}
                  onClick={() => setSelectedIntensity(index)}
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
            })}

          </div>


          <div className="mt-3 flex justify-between text-xs text-[#958d97]">
            <span>Very light</span>
            <span>Extremely heavy</span>
          </div>

        </section>


        {/* What helped section */}
        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            What helped most?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            This helps LUMI understand what kind of
            support was useful for you.
          </p>


          <div className="mt-6 space-y-3">

            {helpOptions.map((option) => {

              const isSelected =
                selectedHelp === option.id

              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedHelp(option.id)}
                  className={`
                    w-full rounded-2xl border p-4
                    text-left text-sm font-medium
                    transition
                    ${
                      isSelected
                        ? 'border-[#80668d] bg-[#f4edf7] text-[#5f4c67]'
                        : 'border-[#e8e0e9] bg-white text-[#514b54] hover:border-[#cbb9d2]'
                    }
                  `}
                >
                  {option.label}
                </button>
              )
            })}

          </div>

        </section>


        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={
            selectedIntensity === null ||
            selectedHelp === null
          }
          className={`
            mt-8 flex w-full items-center
            justify-center gap-2 rounded-2xl
            px-6 py-4 text-sm font-semibold
            transition
            ${
              selectedIntensity !== null &&
              selectedHelp !== null
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

export default ConnectOutcome