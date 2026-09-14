import {
  ArrowLeft,
  ArrowRight,
  Heart,
} from 'lucide-react'

import { useState } from 'react'

import Lumi from '../components/Lumi'


// --------------------------------------------------
// FEELING OPTIONS
// --------------------------------------------------
//
// These are intentionally non-diagnostic.
//
// We are asking about the user's experience,
// not trying to label them with a condition.
//
// --------------------------------------------------

const feelingOptions = [
  'Sad',
  'Lonely',
  'Anxious',
  'Angry',
  'Guilty',
  'Rejected',
  'Confused',
  'Overwhelmed',
  'Disappointed',
  'Numb',
  "I don't know",
]


function ProcessFeeling({ onBack, onContinue }) {

  // ------------------------------------------------
  // SELECTED FEELING
  // ------------------------------------------------

  const [selectedFeeling, setSelectedFeeling] = useState(null)


  // ------------------------------------------------
  // CONTINUE
  // ------------------------------------------------

  const handleContinue = () => {

    if (!selectedFeeling) {
      return
    }


    onContinue(selectedFeeling)

  }


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

            <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">

              <Heart size={17} />

              Step 2 of 3

            </div>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What do you feel when it comes back?
            </h1>


            <p className="mt-5 max-w-xl text-base leading-7 text-[#716b75]">
              There can be more than one feeling.
              Choose the one that feels closest right now.
            </p>


            {/* Feeling options */}

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

              {feelingOptions.map((feeling) => {

                const isSelected =
                  selectedFeeling === feeling


                return (

                  <button
                    key={feeling}
                    onClick={() => setSelectedFeeling(feeling)}
                    className={`rounded-2xl border px-4 py-4 text-sm font-medium transition duration-200 ${
                      isSelected
                        ? 'border-[#80668d] bg-[#f1e7f5] text-[#685574]'
                        : 'border-[#e8e0e9] bg-white text-[#716b75] hover:-translate-y-0.5 hover:border-[#cdb4db] hover:shadow-sm'
                    }`}
                  >
                    {feeling}
                  </button>

                )

              })}

            </div>


            {/* Continue */}

            <button
              onClick={handleContinue}
              disabled={!selectedFeeling}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continue
              <ArrowRight size={18} />
            </button>


            <p className="mt-5 text-xs leading-5 text-[#958d97]">
              These words describe what you are experiencing;
              they are not medical diagnoses.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ProcessFeeling