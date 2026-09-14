import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  ShieldCheck,
} from 'lucide-react'

import Lumi from '../components/Lumi'

// --------------------------------------------------
// CONVERSATION ENDED SCREEN
// --------------------------------------------------
//
// This screen appears after the user leaves a
// Companion conversation.
//
// Why do we need a separate screen?
//
// Instead of immediately sending the user somewhere
// else, we acknowledge that the conversation ended
// and give them a safe next step.
//
// Later, this screen can also:
// - save the session outcome
// - ask "How are you feeling now?"
// - record what helped
// - update the user's PersonalSupportProfile
//
// --------------------------------------------------

function ConversationEnded({ onContinue }) {
  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="mx-auto flex max-w-6xl items-center justify-between">

        <div className="text-lg font-semibold tracking-tight">
          lumi
        </div>

        <div className="flex items-center gap-2 text-xs text-[#958d97]">
          <ShieldCheck size={15} />
          Private support space
        </div>

      </header>


      {/* ==================================================
          MAIN CONTENT
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
              Conversation ended
            </p>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              You can take a moment now.
            </h1>


            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">
              The conversation has ended. You did not have to
              stay longer than felt comfortable.
            </p>


            {/* ==================================================
                STATUS CARD
            ================================================== */}

            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e6f1ed] text-[#54786b]">
                  <CheckCircle2 size={23} />
                </div>

                <div>

                  <h2 className="font-semibold">
                    Your connection has been closed
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#7c747f]">
                    The other person's private information remains
                    protected. You do not need to continue the
                    conversation or exchange personal contact details.
                  </p>

                </div>

              </div>


              {/* ==================================================
                  NEXT STEP
              ================================================== */}

              <div className="mt-7 rounded-2xl bg-[#f8f4fa] p-5">

                <div className="flex items-start gap-3">

                  <Heart
                    size={19}
                    className="mt-0.5 shrink-0 text-[#80668d]"
                  />

                  <div>

                    <p className="text-sm font-medium">
                      What happens next?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7c747f]">
                      LUMI can check in with you and help you choose
                      another kind of support if you still need it.
                    </p>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  CONTINUE BUTTON
              ================================================== */}

              <button
                onClick={onContinue}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540]"
              >
                Continue with LUMI
                <ArrowLeft
                  size={18}
                  className="rotate-180"
                />
              </button>

            </div>


            {/* Privacy note */}
            <p className="mt-5 text-center text-xs leading-5 text-[#958d97]">
              LUMI is a wellbeing support tool, not a replacement
              for professional or emergency care.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ConversationEnded