import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Heart,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

import Lumi from '../components/Lumi'


// --------------------------------------------------
// NEXT STEP OPTIONS
// --------------------------------------------------
//
// The reflection should end with an action.
//
// We intentionally keep the choices small.
//
// LUMI should not overwhelm the user with
// twenty recommendations.
// --------------------------------------------------

const nextSteps = [
  {
    id: 'write',
    title: 'Put the thought into words',
    description:
      'Write down what you wish you could say or understand.',
    icon: Brain,
  },

  {
    id: 'connect',
    title: 'Talk to someone',
    description:
      'If you want human understanding, LUMI can help you find support.',
    icon: MessageCircle,
  },

  {
    id: 'calm',
    title: 'Give myself a calmer moment',
    description:
      'Step away from the thought and let your mind settle.',
    icon: Sparkles,
  },

  {
    id: 'space',
    title: 'Leave it for now',
    description:
      'You do not have to solve this right now.',
    icon: Heart,
  },
]


function ProcessNextStep({ onBack, onSelect }) {

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">


      {/* Header */}

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


      {/* Main */}

      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">


          {/* Lumi */}

          <div className="hidden justify-center lg:flex">

            <Lumi />

          </div>


          {/* Content */}

          <div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              One next step
            </p>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What would help most right now?
            </h1>


            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">
              You don't need to fix everything.
              Just choose one small thing that feels useful.
            </p>


            {/* Options */}

            <div className="mt-8 grid gap-4">

              {nextSteps.map((step) => {

                const Icon = step.icon


                return (

                  <button
                    key={step.id}
                    onClick={() => onSelect(step.id)}
                    className="group flex w-full items-center gap-5 rounded-3xl border border-[#e8e0e9] bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#cdb4db] hover:shadow-md sm:p-6"
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">

                      <Icon size={21} />

                    </div>


                    <div className="min-w-0 flex-1">

                      <h2 className="text-base font-semibold sm:text-lg">
                        {step.title}
                      </h2>


                      <p className="mt-1 text-sm leading-6 text-[#7c747f]">
                        {step.description}
                      </p>

                    </div>


                    <ArrowRight
                      size={19}
                      className="shrink-0 text-[#aaa2ad] transition group-hover:translate-x-1 group-hover:text-[#80668d]"
                    />

                  </button>

                )

              })}

            </div>


            <p className="mt-6 text-xs leading-5 text-[#958d97]">
              There is no "correct" choice. You can always return
              to LUMI later.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ProcessNextStep