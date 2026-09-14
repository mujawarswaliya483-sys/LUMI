import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { useState } from 'react'

import Lumi from '../components/Lumi'


// --------------------------------------------------
// SUPPORT NEED OPTIONS
// --------------------------------------------------
//
// These options describe what the user may need
// emotionally in this particular moment.
//
// IMPORTANT:
//
// These are NOT diagnoses.
//
// For example:
// "I need reassurance"
//
// does NOT mean the person has a medical condition.
//
// It simply tells LUMI what type of support
// may feel useful right now.
// --------------------------------------------------

const needOptions = [
  {
    id: 'understanding',
    title: 'I need to feel understood',
    description:
      'I want someone to understand why this is affecting me.',
    icon: MessageCircle,
  },

  {
    id: 'reassurance',
    title: 'I need reassurance',
    description:
      'I keep questioning myself and need some perspective.',
    icon: Heart,
  },

  {
    id: 'clarity',
    title: 'I need clarity',
    description:
      'I want to understand what I am thinking and why.',
    icon: Sparkles,
  },

  {
    id: 'space',
    title: 'I need some space',
    description:
      'I do not want to talk. I just need room to process.',
    icon: ShieldCheck,
  },
]


function ProcessNeed({ onBack, onContinue }) {

  // ------------------------------------------------
  // SELECTED NEED
  // ------------------------------------------------
  //
  // Initially nothing is selected.
  //
  // When the user clicks an option,
  // React stores that option here.
  //
  const [selectedNeed, setSelectedNeed] = useState(null)


  // ------------------------------------------------
  // CONTINUE
  // ------------------------------------------------

  const handleContinue = () => {

    // Don't continue without a selection.
    if (!selectedNeed) {
      return
    }


    // Send selected need back to App.jsx.
    onContinue(selectedNeed)

  }


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
          MAIN CONTENT
      ================================================== */}

      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">


          {/* ------------------------------------------------
              LUMI
          ------------------------------------------------ */}

          <div className="hidden justify-center lg:flex">

            <Lumi />

          </div>


          {/* ------------------------------------------------
              CONTENT
          ------------------------------------------------ */}

          <div>

            {/* Step indicator */}

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              Step 3 of 3
            </p>


            {/* Heading */}

            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What do you need right now?
            </h1>


            {/* Explanation */}

            <p className="mt-5 max-w-xl text-base leading-7 text-[#716b75]">
              There is no perfect answer. Think about what would
              make this moment a little easier.
            </p>


            {/* ==================================================
                NEED OPTIONS
            ================================================== */}

            <div className="mt-8 grid gap-4">

              {needOptions.map((need) => {

                // Get the icon component.
                const Icon = need.icon


                // Check whether this option is selected.
                const isSelected =
                  selectedNeed === need.id


                return (

                  <button
                    key={need.id}
                    onClick={() =>
                      setSelectedNeed(need.id)
                    }

                    className={`group flex w-full items-center gap-5 rounded-3xl border p-5 text-left transition duration-200 sm:p-6 ${
                      isSelected
                        ? 'border-[#80668d] bg-[#f1e7f5] shadow-sm'
                        : 'border-[#e8e0e9] bg-white hover:-translate-y-0.5 hover:border-[#cdb4db] hover:shadow-md'
                    }`}
                  >

                    {/* Icon */}

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        isSelected
                          ? 'bg-white text-[#80668d]'
                          : 'bg-[#f1e7f5] text-[#80668d]'
                      }`}
                    >

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


                    {/* Selection indicator */}

                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-[#80668d] bg-[#80668d]'
                          : 'border-[#cfc7d1] bg-white'
                      }`}
                    >

                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}

                    </div>

                  </button>

                )

              })}

            </div>


            {/* ==================================================
                CONTINUE BUTTON
            ================================================== */}

            <button
              onClick={handleContinue}
              disabled={!selectedNeed}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540] disabled:cursor-not-allowed disabled:opacity-30"
            >

              Continue

              <ArrowRight size={18} />

            </button>


            {/* Privacy / safety note */}

            <p className="mt-5 text-xs leading-5 text-[#958d97]">
              LUMI uses this answer to understand what kind of
              support may fit your situation. It is not a diagnosis.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ProcessNeed