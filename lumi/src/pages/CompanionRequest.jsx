import {
  ArrowLeft,
  Check,
  Clock3,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'

import Lumi from '../components/Lumi'

// --------------------------------------------------
// TEMPORARY REQUEST DATA
// --------------------------------------------------
//
// This is currently fake frontend data.
//
// Later this information will come from MongoDB
// through our Express backend.
//
// We intentionally don't reveal sensitive information.
// The Companion only receives information that is
// necessary for deciding whether they are comfortable
// accepting the connection.
//
const request = {
  requesterName: 'LUMI Member',
  experience: 'Currently feeling alone',
  supportNeed: 'Wants to be heard',
  connectionType: 'Listening',
}

function CompanionRequest({ onBack, onAccept, onDecline }) {
  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">

      {/* ------------------------------------------------
          HEADER
      ------------------------------------------------ */}

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


      {/* ------------------------------------------------
          MAIN CONTENT
      ------------------------------------------------ */}

      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">

          {/* Lumi */}
          <div className="hidden justify-center lg:flex">
            <Lumi />
          </div>


          {/* Request content */}
          <div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              Companion request
            </p>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Someone is asking to connect.
            </h1>


            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">
              You can choose whether you feel comfortable being
              there for this person right now.
            </p>


            {/* ------------------------------------------------
                REQUEST CARD
            ------------------------------------------------ */}

            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-7">

              {/* Anonymous user */}
              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">
                  <UserRound size={24} />
                </div>


                <div>

                  <h2 className="font-semibold">
                    {request.requesterName}
                  </h2>

                  <p className="mt-1 text-sm text-[#8a828d]">
                    Anonymous LUMI member
                  </p>

                </div>

              </div>


              {/* ------------------------------------------------
                  WHAT THE COMPANION KNOWS
              ------------------------------------------------ */}

              <div className="mt-7">

                <h3 className="text-sm font-semibold">
                  What they shared
                </h3>


                <div className="mt-4 space-y-3">

                  <div className="rounded-2xl bg-[#fcf8f5] p-4">

                    <p className="text-xs uppercase tracking-[0.12em] text-[#958d97]">
                      Right now
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {request.experience}
                    </p>

                  </div>


                  <div className="rounded-2xl bg-[#fcf8f5] p-4">

                    <p className="text-xs uppercase tracking-[0.12em] text-[#958d97]">
                      They need
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {request.supportNeed}
                    </p>

                  </div>


                  <div className="rounded-2xl bg-[#fcf8f5] p-4">

                    <p className="text-xs uppercase tracking-[0.12em] text-[#958d97]">
                      Connection style
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {request.connectionType}
                    </p>

                  </div>

                </div>

              </div>


              {/* ------------------------------------------------
                  COMPANION BOUNDARY
              ------------------------------------------------ */}

              <div className="mt-7 rounded-2xl bg-[#f8f4fa] p-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#80668d]"
                  />

                  <div>

                    <p className="text-sm font-medium">
                      Remember your role
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7c747f]">
                      You are here to listen and share your own
                      experience. You are not expected to diagnose,
                      treat, or solve someone's mental health.
                    </p>

                  </div>

                </div>

              </div>


              {/* ------------------------------------------------
                  SAFETY INFORMATION
              ------------------------------------------------ */}

              <div className="mt-4 rounded-2xl border border-[#eee7ef] bg-[#fcf8f5] p-4">

                <div className="flex items-start gap-3">

                  <Clock3
                    size={18}
                    className="mt-0.5 shrink-0 text-[#80668d]"
                  />

                  <div>

                    <p className="text-sm font-medium">
                      You stay in control
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7c747f]">
                      You can decline this request or leave the
                      conversation later. You never need to exchange
                      personal contact information.
                    </p>

                  </div>

                </div>

              </div>


              {/* ------------------------------------------------
                  ACCEPT / DECLINE
              ------------------------------------------------ */}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                <button
                  onClick={onDecline}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#e5dfe6] bg-white px-5 py-4 text-sm font-medium text-[#716b75] transition hover:border-[#cfc5d2] hover:bg-[#faf8fb]"
                >
                  <X size={18} />
                  Decline
                </button>


                <button
                  onClick={onAccept}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540]"
                >
                  <Check size={18} />
                  Accept connection
                </button>

              </div>

            </div>


            {/* Safety note */}
            <div className="mt-5 flex items-start gap-3">

              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-[#9a7ba5]"
              />

              <p className="text-xs leading-5 text-[#958d97]">
                LUMI Companions are volunteers or eligible members
                who choose to support others. Accepting a request
                does not make you responsible for the other person's
                wellbeing.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default CompanionRequest