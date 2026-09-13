import { ArrowLeft, ArrowRight, Heart, Brain, Sparkles, HelpCircle } from 'lucide-react'
import Lumi from '../components/Lumi'

// These are the four support needs LUMI currently understands.
//
// IMPORTANT:
// These are NOT medical diagnoses.
// They simply describe what kind of support
// the person wants at this moment.
const supportNeeds = [
  {
    id: 'connect',
    title: 'I want to be heard',
    description:
      'I want someone who understands what I am going through.',
    icon: Heart,
  },
  {
    id: 'process',
    title: 'I want to make sense of it',
    description:
      'I want to understand what keeps coming back in my mind.',
    icon: Brain,
  },
  {
    id: 'calm',
    title: 'I just want to feel a little better',
    description:
      'I do not want to explain everything. I just need a calmer moment.',
    icon: Sparkles,
  },
  {
    id: 'unknown',
    title: "I don't know yet",
    description:
      'I am not sure what I need. Help me figure it out.',
    icon: HelpCircle,
  },
]


// Props received from App.jsx:
//
// onBack
// → takes the user back to Safety Check.
//
// onSelectNeed
// → sends the user's selected support need
//   back to App.jsx.
function NeedDiscovery({ onBack, onSelectNeed }) {

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

        {/* Empty space keeps the logo centered */}
        <div className="w-16" />

      </header>


      {/* ==================================================
          MAIN CONTENT
          ================================================== */}

      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">


          {/* ==================================================
              LUMI CHARACTER
              ================================================== */}

          <div className="hidden justify-center lg:flex">
            <Lumi />
          </div>


          {/* ==================================================
              QUESTION + OPTIONS
              ================================================== */}

          <div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              Finding the right support
            </p>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What do you need right now?
            </h1>


            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">
              There is no right answer. Choose what feels closest,
              or let LUMI help you decide.
            </p>


            {/* ==================================================
                SUPPORT OPTIONS
                ================================================== */}

            <div className="mt-8 grid gap-4">

              {supportNeeds.map((need) => {

                // Each option contains its own icon component.
                //
                // Example:
                // need.icon = Heart
                // need.icon = Brain
                //
                // We store the component in a variable so
                // we can render it below.
                const Icon = need.icon

                return (
                  <button
                    key={need.id}
                    onClick={() => onSelectNeed(need.id)}
                    className="group flex w-full items-center gap-5 rounded-3xl border border-[#e8e0e9] bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#cdb4db] hover:shadow-md sm:p-6"
                  >

                    {/* Icon container */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">

                      <Icon size={21} />

                    </div>


                    {/* Text */}
                    <div className="min-w-0 flex-1">

                      <h2 className="text-base font-semibold sm:text-lg">
                        {need.title}
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-[#7c747f]">
                        {need.description}
                      </p>

                    </div>


                    {/* Arrow */}
                    <ArrowRight
                      size={19}
                      className="shrink-0 text-[#aaa2ad] transition group-hover:translate-x-1 group-hover:text-[#80668d]"
                    />

                  </button>
                )
              })}

            </div>


            {/* Explanation */}
            <p className="mt-6 max-w-xl text-xs leading-5 text-[#958d97]">
              LUMI uses your choice together with your check-in,
              preferences, and later feedback to decide what support
              may fit you best.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default NeedDiscovery