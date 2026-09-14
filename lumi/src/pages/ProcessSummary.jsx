import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Heart,
  Lightbulb,
} from 'lucide-react'

import Lumi from '../components/Lumi'


// --------------------------------------------------
// PROCESS SUMMARY
// --------------------------------------------------
//
// This screen turns the user's answers into a
// simple structured reflection.
//
// Example:
//
// Trigger:
// "I keep thinking about the argument."
//
// Feeling:
// "Guilty"
//
// Need:
// "I need reassurance"
//
//
//
// IMPORTANT:
//
// This is NOT a diagnosis.
// It is simply a reflection of what the user
// told LUMI.
//
// Later, an AI service will help generate a
// more personalized insight.
// --------------------------------------------------


// --------------------------------------------------
// HUMAN-READABLE LABELS
// --------------------------------------------------

const needLabels = {
  understanding: 'feeling understood',
  reassurance: 'reassurance',
  clarity: 'clarity',
  space: 'some space',
}


// --------------------------------------------------
// SUMMARY GENERATOR
// --------------------------------------------------
//
// This function creates a simple sentence based
// on the structured information.
//
// Later this logic can be replaced by a backend
// AI service.
//
// --------------------------------------------------

function createInsight(feeling, need) {

  const readableNeed =
    needLabels[need] || 'some support'


  if (need === 'understanding') {

    return `It sounds like this situation is affecting you deeply, and part of what you may need right now is to feel understood rather than having to solve everything immediately.`

  }


  if (need === 'reassurance') {

    return `It sounds like your mind may be looking for reassurance around this situation. You may not need a perfect answer right now — you may first need some perspective and kindness toward yourself.`

  }


  if (need === 'clarity') {

    return `It sounds like the thought keeps returning because there is still something you are trying to make sense of. Giving the thought some structure may make it feel less tangled.`

  }


  if (need === 'space') {

    return `It sounds like talking may not be what you need right now. Having some quiet space without pressure to explain everything can also be a valid form of support.`

  }


  return `You seem to be looking for ${readableNeed} right now.`

}


function ProcessSummary({
  thought,
  feeling,
  need,
  onBack,
  onContinue,
}) {

  // ------------------------------------------------
  // CREATE INSIGHT
  // ------------------------------------------------

  const insight = createInsight(feeling, need)


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

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              Your reflection
            </p>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Let's put the pieces together.
            </h1>


            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">
              Based on what you shared, here's one way to look
              at what may be happening.
            </p>


            {/* ==================================================
                STRUCTURED REFLECTION
            ================================================== */}

            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-7">


              {/* ------------------------------------------------
                  THOUGHT
              ------------------------------------------------ */}

              <div>

                <div className="flex items-center gap-2">

                  <Brain
                    size={18}
                    className="text-[#80668d]"
                  />

                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#958d97]">
                    What keeps coming back
                  </p>

                </div>


                <p className="mt-3 rounded-2xl bg-[#fcf8f5] p-4 text-sm leading-6 text-[#4f4854]">
                  {thought}
                </p>

              </div>


              {/* ------------------------------------------------
                  FEELING
              ------------------------------------------------ */}

              <div className="mt-6">

                <div className="flex items-center gap-2">

                  <Heart
                    size={18}
                    className="text-[#80668d]"
                  />

                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#958d97]">
                    What you feel
                  </p>

                </div>


                <p className="mt-3 text-base font-semibold">
                  {feeling}
                </p>

              </div>


              {/* ------------------------------------------------
                  NEED
              ------------------------------------------------ */}

              <div className="mt-6">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={18}
                    className="text-[#54786b]"
                  />

                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#958d97]">
                    What you may need
                  </p>

                </div>


                <p className="mt-3 text-base font-semibold">
                  {needLabels[need] || 'some support'}
                </p>

              </div>


              {/* ==================================================
                  INSIGHT
              ================================================== */}

              <div className="mt-7 rounded-2xl bg-[#f1e7f5] p-5">

                <div className="flex items-start gap-3">

                  <Lightbulb
                    size={19}
                    className="mt-0.5 shrink-0 text-[#80668d]"
                  />


                  <div>

                    <p className="text-sm font-semibold">
                      A possible perspective
                    </p>


                    <p className="mt-2 text-sm leading-6 text-[#685b6d]">
                      {insight}
                    </p>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  NEXT STEP
              ================================================== */}

              <div className="mt-7">

                <p className="text-sm font-semibold">
                  You don't have to solve everything tonight.
                </p>


                <p className="mt-2 text-sm leading-6 text-[#716b75]">
                  The next step is simply to decide what would
                  feel most useful now.
                </p>

              </div>


              {/* Continue */}

              <button
                onClick={onContinue}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540]"
              >

                Choose my next step

                <ArrowRight size={18} />

              </button>

            </div>


            <p className="mt-5 text-xs leading-5 text-[#958d97]">
              This reflection is based only on what you shared.
              It is not a clinical assessment or diagnosis.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ProcessSummary