import {
  ArrowLeft,
  ArrowRight,
  Brain,
} from 'lucide-react'

import { useState } from 'react'

import Lumi from '../components/Lumi'


// --------------------------------------------------
// PROCESS THOUGHT
// --------------------------------------------------
//
// This screen asks:
//
// "What keeps coming back?"
//
// We don't force the user to write a long explanation.
//
// A short response is enough.
//
// --------------------------------------------------

function ProcessThought({ onBack, onContinue }) {

  // ------------------------------------------------
  // INPUT STATE
  // ------------------------------------------------
  //
  // React stores whatever the user types.
  //
  const [thought, setThought] = useState('')


  // ------------------------------------------------
  // CONTINUE
  // ------------------------------------------------

  const handleContinue = () => {

    const trimmedThought = thought.trim()


    // Don't continue with an empty response.
    if (!trimmedThought) {
      return
    }


    // Send the user's answer to App.jsx.
    onContinue(trimmedThought)

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

              <Brain size={17} />

              Step 1 of 3

            </div>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What keeps coming back?
            </h1>


            <p className="mt-5 max-w-xl text-base leading-7 text-[#716b75]">
              Is there a person, moment, conversation, mistake,
              worry, or thought that your mind keeps returning to?
            </p>


            {/* Input card */}

            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-7">

              <textarea
                value={thought}
                onChange={(event) => setThought(event.target.value)}
                placeholder="Write whatever comes to mind..."
                rows={6}
                maxLength={1000}
                className="w-full resize-none rounded-2xl border border-[#e5dfe6] bg-[#fcf8f5] px-5 py-4 text-sm leading-6 outline-none transition placeholder:text-[#aaa2ad] focus:border-[#bda5cb] focus:bg-white"
              />


              {/* Character count */}

              <div className="mt-2 text-right text-xs text-[#aaa2ad]">
                {thought.length}/1000
              </div>


              {/* Continue */}

              <button
                onClick={handleContinue}
                disabled={!thought.trim()}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540] disabled:cursor-not-allowed disabled:opacity-30"
              >
                Continue
                <ArrowRight size={18} />
              </button>

            </div>


            <p className="mt-5 text-xs leading-5 text-[#958d97]">
              You don't have to write it perfectly. This is only
              for helping you understand what is happening.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ProcessThought