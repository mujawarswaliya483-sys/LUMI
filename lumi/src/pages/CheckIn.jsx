// We use an icon from lucide-react for the Back button
// and for the arrow inside each option.
import { ArrowLeft, ArrowRight } from 'lucide-react'

// We reuse our Lumi character on this screen.
import Lumi from '../components/Lumi'


// These are the emotional states that the user can choose.
//
// IMPORTANT:
// These are NOT diagnoses.
//
// They simply describe how the person might be feeling
// in their own words.
const emotionalStates = [
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
    label: 'I feel low',
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


// CheckIn receives two functions from App.jsx:
//
// onBack
// → tells App.jsx that the user wants to go back.
//
// onContinue
// → tells App.jsx which emotional state the user selected.
function CheckIn({ onBack, onContinue }) {

  return (

    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">


      {/* ==========================================
          HEADER
          ========================================== */}

      <header className="mx-auto flex max-w-6xl items-center justify-between">

        {/* 
          Back button.

          When clicked:
          CheckIn → onBack() → App.jsx

          App.jsx will then change the screen
          back to RoleSelection.
        */}

        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#716b75] transition hover:bg-white hover:text-[#29252d]"
        >
          <ArrowLeft size={18} />
          Back
        </button>


        {/* LUMI logo */}

        <div className="text-lg font-semibold tracking-tight">
          lumi
        </div>


        {/* Empty space keeps the logo centered */}

        <div className="w-16" />

      </header>



      {/* ==========================================
          MAIN CONTENT
          ========================================== */}

      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">


          {/* ======================================
              LUMI VISUAL
              ====================================== */}

          <div className="hidden justify-center lg:flex">

            <Lumi />

          </div>



          {/* ======================================
              CHECK-IN CONTENT
              ====================================== */}

          <div>

            {/* Small label */}

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              Check-in
            </p>


            {/* Main question */}

            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What's happening right now?
            </h1>


            {/* Explanation */}

            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">

              You don't have to explain everything.
              Just choose what feels closest right now.

            </p>



            {/* ======================================
                EMOTIONAL STATE OPTIONS
                ====================================== */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              {/*
                `.map()` goes through every item in
                emotionalStates and creates a button.

                Instead of writing 9 buttons manually,
                React creates them for us.

                This is a very common React pattern.
              */}

              {emotionalStates.map((state) => (

                <button
                  key={state.id}

                  /*
                    When the user clicks an option,
                    we send the selected ID to App.jsx.

                    Example:

                    If the user clicks:

                    "I feel alone"

                    then:

                    onContinue('alone')

                  */

                  onClick={() => onContinue(state.id)}

                  className="group flex items-center justify-between rounded-2xl border border-[#e8e0e9] bg-white px-5 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#cdb4db] hover:shadow-md"
                >

                  {/* Text */}

                  <span className="text-[15px] font-medium">
                    {state.label}
                  </span>


                  {/* Arrow */}

                  <ArrowRight
                    size={17}
                    className="text-[#aaa2ad] transition group-hover:translate-x-1 group-hover:text-[#80668d]"
                  />

                </button>

              ))}

            </div>



            {/* Important explanation */}

            <p className="mt-6 max-w-xl text-xs leading-5 text-[#958d97]">

              Your answer helps LUMI understand what kind of support may fit
              this moment. It is not a diagnosis.

            </p>

          </div>

        </div>

      </section>

    </main>
  )
}


// This allows App.jsx to import CheckIn.
export default CheckIn