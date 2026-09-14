import { useEffect, useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'

function Calm({ onBack, onComplete }) {

  // --------------------------------------------------
  // CURRENT CALM STEP
  // --------------------------------------------------
  //
  // LUMI guides the user through a very short
  // grounding exercise.
  //
  // We deliberately keep this simple.
  // The goal is not to create an endless meditation
  // library.
  // --------------------------------------------------

  const [step, setStep] = useState(0)

  const [secondsLeft, setSecondsLeft] = useState(60)

  const [isFinished, setIsFinished] = useState(false)


  // --------------------------------------------------
  // CALMING MESSAGES
  // --------------------------------------------------

  const steps = [

    {
      title: 'Get comfortable',
      description:
        'You do not have to solve anything right now. Just stay here for a moment.',
    },

    {
      title: 'Notice your breathing',
      description:
        'Take a slow breath in. Then let it leave without forcing it.',
    },

    {
      title: 'Notice your surroundings',
      description:
        'Look around and notice one thing you can see, one thing you can hear, and one thing you can physically feel.',
    },

    {
      title: 'Let the thought be there',
      description:
        'You do not have to fight the thought. Notice it, then gently bring your attention back to this moment.',
    },

    {
      title: 'Take one more breath',
      description:
        'Slowly breathe in. Slowly breathe out. Give yourself permission to pause.',
    },

  ]


  // --------------------------------------------------
  // TIMER
  // --------------------------------------------------
  //
  // useEffect runs when the component is displayed.
  //
  // The interval decreases the timer once every second.
  // --------------------------------------------------

  useEffect(() => {

    if (isFinished) {
      return
    }


    const timer = setInterval(() => {

      setSecondsLeft((previousSeconds) => {

        if (previousSeconds <= 1) {

          clearInterval(timer)

          setIsFinished(true)

          return 0

        }


        return previousSeconds - 1

      })

    }, 1000)


    // IMPORTANT:
    // Clean up the timer when the component
    // disappears.
    //
    // Otherwise multiple timers could remain active.

    return () => {
      clearInterval(timer)
    }

  }, [isFinished])


  // --------------------------------------------------
  // NEXT STEP
  // --------------------------------------------------

  const handleNext = () => {

    if (step < steps.length - 1) {

      setStep((previousStep) => previousStep + 1)

      return

    }


    setIsFinished(true)

  }


  return (

    <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

      <div className="mx-auto flex min-h-[90vh] max-w-2xl flex-col">


        {/* ------------------------------------------ */}
        {/* BACK */}
        {/* ------------------------------------------ */}

        <button
          onClick={onBack}
          className="mb-10 inline-flex w-fit items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
        >
          <ArrowLeft size={17} />
          Back
        </button>


        {/* ------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------ */}

        <div className="text-center">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
            LUMI CALM
          </p>


          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            You don't have to explain anything.
          </h1>


          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#716b75]">
            Let's just make the next minute a little quieter.
          </p>

        </div>


        {/* ------------------------------------------ */}
        {/* CALMING CIRCLE */}
        {/* ------------------------------------------ */}

        <div className="my-12 flex flex-1 items-center justify-center">

          <div className="relative flex h-64 w-64 items-center justify-center">


            {/* Outer breathing circle */}

            <div className="absolute h-64 w-64 animate-[pulseSoft_4s_ease-in-out_infinite] rounded-full bg-[#d9c5e8]/30 blur-2xl" />


            <div className="absolute h-52 w-52 animate-[pulseSoft_4s_ease-in-out_infinite] rounded-full border border-[#cdb4db]/50" />


            {/* Main circle */}

            <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#f9f4fc] to-[#d8c3e2] shadow-[0_20px_50px_rgba(92,67,110,0.15)]">

              {!isFinished ? (

                <>
                  <span className="text-4xl font-semibold">
                    {secondsLeft}
                  </span>

                  <span className="mt-1 text-xs text-[#716b75]">
                    seconds
                  </span>
                </>

              ) : (

                <Check
                  size={42}
                  className="text-[#54786b]"
                />

              )}

            </div>

          </div>

        </div>


        {/* ------------------------------------------ */}
        {/* CURRENT MESSAGE */}
        {/* ------------------------------------------ */}

        {!isFinished ? (

          <section className="rounded-3xl border border-[#e8e0e9] bg-white p-7 text-center shadow-sm sm:p-9">

            <p className="text-xl font-semibold">
              {steps[step].title}
            </p>


            <p className="mx-auto mt-4 max-w-lg leading-7 text-[#716b75]">
              {steps[step].description}
            </p>


            <button
              onClick={handleNext}
              className="mt-7 rounded-2xl bg-[#29252d] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3b3540]"
            >
              {step === steps.length - 1
                ? 'Finish'
                : 'Continue'}
            </button>

          </section>

        ) : (

          <section className="rounded-3xl border border-[#e8e0e9] bg-white p-7 text-center shadow-sm sm:p-9">

            <p className="text-xl font-semibold">
              You made it through the minute.
            </p>


            <p className="mx-auto mt-4 max-w-lg leading-7 text-[#716b75]">
              You don't need to force yourself to feel completely
              different. Just notice where you are right now.
            </p>


            <button
              onClick={onComplete}
              className="mt-7 rounded-2xl bg-[#29252d] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3b3540]"
            >
              Check in with myself
            </button>

          </section>

        )}

      </div>

    </main>

  )
}

export default Calm