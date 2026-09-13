import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import Lumi from '../components/Lumi'


// ==================================================
// TEMPORARY COMPANION DATA
// ==================================================
//
// IMPORTANT:
//
// These are NOT real people.
//
// We are using sample data only to build and
// test the frontend.
//
// Later this information will come from our
// backend + MongoDB.
//
const companion = {
  name: 'LUMI Companion',
  experience: 'Has experience with loneliness',
  supportStyle: 'Prefers listening rather than giving advice',
  availability: 'Available now',
}


// ==================================================
// CONNECT COMPONENT
// ==================================================
//
// Props:
//
// onBack
// → takes the user back to Need Discovery.
//
// onContinue
// → continues after the user decides to request
//   a connection.
//
function Connect({ onBack, onContinue }) {

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


          {/* ==================================================
              LUMI CHARACTER
              ================================================== */}

          <div className="hidden justify-center lg:flex">
            <Lumi />
          </div>


          {/* ==================================================
              CONNECTION AREA
              ================================================== */}

          <div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              Connect
            </p>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Someone who understands might be here.
            </h1>


            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">
              LUMI looks for a Companion who has chosen to support
              someone with a similar experience.
            </p>


            {/* ==================================================
                MATCH CARD
                ================================================== */}

            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-7">

              {/* Profile header */}

              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">

                  <UserRound size={24} />

                </div>


                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="font-semibold">
                      {companion.name}
                    </h2>

                    <span className="rounded-full bg-[#e6f1ed] px-2.5 py-1 text-xs font-medium text-[#54786b]">
                      {companion.availability}
                    </span>

                  </div>


                  <p className="mt-1 text-sm text-[#8a828d]">
                    LUMI Companion
                  </p>

                </div>

              </div>


              {/* ==================================================
                  WHY THIS MATCH?
                  ================================================== */}

              <div className="mt-7">

                <h3 className="text-sm font-semibold">
                  Why this could be a good match
                </h3>


                <div className="mt-4 space-y-3">

                  <div className="flex items-start gap-3">

                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-[#54786b]"
                    />

                    <p className="text-sm leading-6 text-[#716b75]">
                      {companion.experience}
                    </p>

                  </div>


                  <div className="flex items-start gap-3">

                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-[#54786b]"
                    />

                    <p className="text-sm leading-6 text-[#716b75]">
                      {companion.supportStyle}
                    </p>

                  </div>


                  <div className="flex items-start gap-3">

                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-[#54786b]"
                    />

                    <p className="text-sm leading-6 text-[#716b75]">
                      Available to connect right now
                    </p>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  SAFETY / CONSENT
                  ================================================== */}

              <div className="mt-7 rounded-2xl bg-[#f8f4fa] p-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#80668d]"
                  />

                  <div>

                    <p className="text-sm font-medium">
                      You stay in control
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7c747f]">
                      You can leave the conversation at any time.
                      LUMI Companions listen and share experience;
                      they do not diagnose or provide professional treatment.
                    </p>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  ACTION
                  ================================================== */}

              <button
                onClick={onContinue}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540]"
              >
                Request connection

                <ArrowRight size={18} />

              </button>

            </div>


            {/* ==================================================
                PRIVACY NOTE
                ================================================== */}

            <div className="mt-5 flex items-start gap-3">

              <Heart
                size={16}
                className="mt-0.5 shrink-0 text-[#9a7ba5]"
              />

              <p className="text-xs leading-5 text-[#958d97]">
                LUMI does not publicly display your profile,
                follower counts, popularity, or exact location.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Connect