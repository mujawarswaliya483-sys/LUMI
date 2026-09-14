import { useState } from 'react'
import { Check } from 'lucide-react'

function CalmOutcome({ onContinue }) {

  const [intensityAfter, setIntensityAfter] = useState(null)

  const [whatHelped, setWhatHelped] = useState(null)


  const helpfulOptions = [
    {
      id: 'breathing',
      label: 'Slowing my breathing',
    },
    {
      id: 'grounding',
      label: 'Noticing my surroundings',
    },
    {
      id: 'quiet',
      label: 'Having a quiet moment',
    },
    {
      id: 'pause',
      label: 'Taking a break from the thought',
    },
    {
      id: 'nothing',
      label: 'Nothing in particular',
    },
  ]


  const handleContinue = () => {

    if (
      intensityAfter === null ||
      whatHelped === null
    ) {
      return
    }


    onContinue({
      intensityAfter,
      whatHelped,
    })

  }


  return (

    <main className="min-h-screen bg-[#fcf8f5] px-5 py-10 text-[#29252d]">

      <div className="mx-auto max-w-2xl">

        {/* ------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------ */}

        <div className="text-center">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
            After CALM
          </p>


          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            How are you feeling now?
          </h1>


          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#716b75]">
            There is no right answer. Just notice what is true
            for you right now.
          </p>

        </div>


        {/* ------------------------------------------ */}
        {/* INTENSITY */}
        {/* ------------------------------------------ */}

        <section className="mt-10 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            How heavy does it feel right now?
          </h2>


          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            Choose a number from 0 to 10.
          </p>


          <div className="mt-6 grid grid-cols-6 gap-2 sm:grid-cols-11">

            {Array.from(
              { length: 11 },
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setIntensityAfter(index)
                  }
                  className={`
                    flex h-11 items-center justify-center
                    rounded-xl border text-sm font-medium
                    transition
                    ${
                      intensityAfter === index
                        ? 'border-[#80668d] bg-[#80668d] text-white'
                        : 'border-[#e8e0e9] bg-[#fcf8f5] text-[#716b75] hover:border-[#bda5cb]'
                    }
                  `}
                >
                  {index}
                </button>

              )
            )}

          </div>

        </section>


        {/* ------------------------------------------ */}
        {/* WHAT HELPED */}
        {/* ------------------------------------------ */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            What helped most?
          </h2>


          <div className="mt-5 space-y-3">

            {helpfulOptions.map((option) => {

              const selected =
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
                      selected
                        ? 'border-[#80668d] bg-[#f4edf7]'
                        : 'border-[#e8e0e9] hover:border-[#cbb9d2]'
                    }
                  `}
                >

                  <span className="text-sm font-medium">
                    {option.label}
                  </span>


                  {selected && (

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
        {/* FINISH */}
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
          Finish check-in
        </button>

      </div>

    </main>

  )
}

export default CalmOutcome